import express from "express";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  Timestamp, 
  updateDoc,
  getDoc,
  runTransaction
} from "firebase/firestore";

const app = express();
const PORT = 3000;

app.use(express.json());

// Load Firebase configuration
const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

// -------------------------------------------------------------------------
// EMAIL UTILS
// -------------------------------------------------------------------------
interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
}

async function sendMail(payload: EmailPayload): Promise<{ success: boolean; error?: string; method: string }> {
  const { to, subject, html, text } = payload;
  const fromAddress = process.env.SMTP_FROM || "gopaljikhopra@gmail.com";

  // Option 1: Resend API
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: `Gopalji Khopra Udyog <${fromAddress}>`,
          to: [to],
          subject,
          html
        })
      });

      if (response.ok) {
        return { success: true, method: "Resend" };
      } else {
        const errorText = await response.text();
        return { success: false, error: `Resend error: ${errorText}`, method: "Resend" };
      }
    } catch (err: any) {
      return { success: false, error: err.message, method: "Resend" };
    }
  }

  // Option 2: Nodemailer SMTP
  if (process.env.SMTP_HOST) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER || "",
          pass: process.env.SMTP_PASS || ""
        }
      });

      await transporter.sendMail({
        from: `"Gopalji Khopra Udyog" <${fromAddress}>`,
        to,
        subject,
        text,
        html
      });

      return { success: true, method: "SMTP" };
    } catch (err: any) {
      return { success: false, error: err.message, method: "SMTP" };
    }
  }

  // Fallback: Simulated Mode (for dev sandbox ease without requiring immediate secrets)
  console.log(`[SIMULATED EMAIL DELIVERY]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${text}`);
  console.log(`-----------------------------------------------`);
  
  return { 
    success: true, 
    method: "Simulated (Credentials Missing. Set RESEND_API_KEY or SMTP parameters in environment to send live emails)" 
  };
}

// Save delivery log helper
async function logEmailDelivery(logData: {
  inquiryId: string;
  type: "admin_notification" | "customer_autoreply";
  to: string;
  subject: string;
  status: "Success" | "Failed";
  error?: string;
  method: string;
}) {
  const logId = `LG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  try {
    await setDoc(doc(db, "email_delivery_logs", logId), {
      logId,
      ...logData,
      error: logData.error || null,
      sentAt: new Date().toISOString(),
      retryCount: 0
    });
  } catch (error) {
    console.error("Failed to store email delivery log:", error);
  }
}

// -------------------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------------------

// Helper to generate the next unique sequential inquiryId
async function generateNextInquiryId(): Promise<string> {
  const year = new Date().getFullYear();
  let nextNum = 1;

  try {
    const seqRef = doc(db, "sequences", "inquiries");
    nextNum = await runTransaction(db, async (transaction) => {
      const seqSnap = await transaction.get(seqRef);
      if (!seqSnap.exists()) {
        transaction.set(seqRef, { current: 1 });
        return 1;
      }
      const data = seqSnap.data();
      const current = data.current || 0;
      const next = current + 1;
      transaction.update(seqRef, { current: next });
      return next;
    });
  } catch (error) {
    console.error("Error reading sequence from Firestore:", error);
    // Offline / permission error fallback
    nextNum = Math.floor(Math.random() * 900) + 100;
  }

  return `GKU-${year}-${String(nextNum).padStart(4, "0")}`;
}

// Submit commercial inquiry
app.post("/api/inquiries", async (req, res) => {
  try {
    const { 
      name, 
      companyName, 
      email, 
      phone, 
      city, 
      state, 
      product, 
      quantity, 
      message, 
      source 
    } = req.body;

    if (!name || !phone || !email || !product) {
      return res.status(400).json({ error: "Missing required fields (name, phone, email, product)" });
    }

    // Generate unique index sequence
    const inquiryId = await generateNextInquiryId();
    const createdAtStr = new Date().toISOString();

    const newInquiry = {
      inquiryId,
      name,
      companyName: companyName || "Individual Prospect",
      email,
      phone,
      city: city || "Indore",
      state: state || "Madhya Pradesh",
      product,
      quantity: quantity || "Bulk / Wholesale",
      message: message || "Sent via digital channels.",
      status: "Pending",
      source: source || "Direct Website Form",
      createdAt: Timestamp.now()
    };

    // Store in Firestore inquiries collection
    await setDoc(doc(db, "inquiries", inquiryId), newInquiry);

    // Prepare emails
    const adminEmail = "sayedozair25@gmail.com";
    const appUrl = process.env.APP_URL || "https://www.gopaljikhopraudhyog.com";
    
    // Subject lines
    const adminSubject = `🔔 New Inquiry Received - Gopalji Khopra Udyog`;
    const customerSubject = `Thank You For Contacting Gopalji Khopra Udyog`;

    // Admin Notification Template
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5d5bc; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #6B4A2E; color: #fff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">New B2B Inquiry Received</h2>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Gopalji Khopra Udyog Lead Portal</p>
        </div>
        <div style="padding: 24px; background-color: #faf7f2;">
          <div style="background-color: #fff; border: 1px solid #e5d5bc; border-radius: 6px; padding: 18px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px; font-weight: bold; color: #8C6239; font-size: 16px;">Inquiry ID: ${inquiryId}</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; font-weight: bold; width: 120px; color: #666;">Name:</td><td style="padding: 6px 0;">${name}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold; color: #666;">Company:</td><td style="padding: 6px 0;">${companyName}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold; color: #666;">Email:</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #8C6239; text-decoration: none;">${email}</a></td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold; color: #666;">Phone:</td><td style="padding: 6px 0;"><a href="tel:${phone}" style="color: #8C6239; text-decoration: none;">${phone}</a></td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold; color: #666;">City:</td><td style="padding: 6px 0;">${city || "Indore"}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold; color: #666;">State:</td><td style="padding: 6px 0;">${state || "Madhya Pradesh"}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold; color: #666;">Product:</td><td style="padding: 6px 0; font-weight: bold; color: #6B4A2E;">${product}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold; color: #666;">Quantity:</td><td style="padding: 6px 0;">${quantity || "Bulk / Wholesale"}</td></tr>
            </table>
          </div>
          <p style="font-weight: bold; margin-bottom: 5px;">Message Details:</p>
          <div style="background-color: #fff; border-left: 4px solid #8C6239; padding: 12px; margin-bottom: 20px; font-style: italic; font-size: 13px;">
            ${message ? message.replace(/\n/g, "<br/>") : "No custom message provided."}
          </div>
          <p style="font-size: 12px; color: #888;">Submitted At: ${createdAtStr}</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${appUrl}/login" style="background-color: #6B4A2E; color: white; padding: 12px 25px; text-decoration: none; font-size: 14px; font-weight: bold; border-radius: 25px; display: inline-block;">Access Dashboard</a>
          </div>
        </div>
        <div style="background-color: #efe6d5; text-align: center; padding: 15px; font-size: 11px; color: #777;">
          © Gopalji Khopra Udyog, Indore. Proprietary Lead Record System.
        </div>
      </div>
    `;

    const adminText = `New Inquiry Received\n\nInquiry ID: ${inquiryId}\nName: ${name}\nCompany: ${companyName}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city || "Indore"}\nState: ${state || "Madhya Pradesh"}\nProduct: ${product}\nQuantity: ${quantity || "Bulk / Wholesale"}\n\nMessage:\n${message || "No custom message provided."}\n\nSubmitted At: ${createdAtStr}`;

    // Customer Auto-reply Template
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5d5bc; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #6B4A2E; color: #fff; padding: 25px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">Inquiry Confirmation</h2>
          <p style="margin: 5px 0 0; font-size: 13px; opacity: 0.9;">Gopalji Khopra Udyog, Indore</p>
        </div>
        <div style="padding: 24px; background-color: #faf7f2;">
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for your valuable commercial inquiry. We are pleased to confirm that we have successfully received your partnership request profile.</p>
          
          <div style="background-color: #fff; border: 1px solid #e5d5bc; border-radius: 6px; padding: 15px; margin: 20px 0; text-align: center;">
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8c6239; font-weight: bold; display: block;">YOUR ASSIGNED INQUIRY ID</span>
            <strong style="font-size: 20px; color: #6B4A2E; display: block; margin-top: 5px;">${inquiryId}</strong>
          </div>
          
          <p>Our business representative from the Indore headquarters is currently analyzing your specifications against active milling availability. We will contact you shortly with bespoke wholesale pricing matrices, delivery roadmaps, and custom product parameters tailored for your requirements.</p>
          
          <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5d5bc; font-size: 14px; text-align: center;">
            Regards,<br/>
            <strong>Gopalji Khopra Udyog</strong><br/>
            <span style="font-size: 11px; opacity: 0.7;">Central India's Trusted Coconut Ingredients Partner</span>
          </p>
        </div>
        <div style="background-color: #efe6d5; text-align: center; padding: 15px; font-size: 11px; color: #777;">
          If you need immediate assistance, text us on WhatsApp via +91 94250 54999.
        </div>
      </div>
    `;

    const customerText = `Dear ${name},\n\nThank you for your inquiry.\n\nWe have successfully received your request.\n\nInquiry ID:\n${inquiryId}\n\nOur team will review your inquiry and contact you shortly with pricing and availability details.\n\nBest regards,\nGopalji Khopra Udyog`;

    // Fire off emails concurrently and log results
    const [adminResult, customerResult] = await Promise.all([
      sendMail({ to: adminEmail, subject: adminSubject, html: adminHtml, text: adminText }),
      sendMail({ to: email, subject: customerSubject, html: customerHtml, text: customerText })
    ]);

    // Record delivery logs
    await Promise.all([
      logEmailDelivery({
        inquiryId,
        type: "admin_notification",
        to: adminEmail,
        subject: adminSubject,
        status: adminResult.success ? "Success" : "Failed",
        error: adminResult.error,
        method: adminResult.method
      }),
      logEmailDelivery({
        inquiryId,
        type: "customer_autoreply",
        to: email,
        subject: customerSubject,
        status: customerResult.success ? "Success" : "Failed",
        error: customerResult.error,
        method: customerResult.method
      })
    ]);

    return res.status(200).json({ 
      success: true, 
      inquiryId, 
      adminEmailStatus: adminResult, 
      customerEmailStatus: customerResult
    });

  } catch (error: any) {
    console.error("API error submitting B2B inquiry:", error);
    return res.status(500).json({ error: error.message || "Unknown server execution error" });
  }
});

// GET email delivery logs
app.get("/api/email-logs", async (req, res) => {
  try {
    const q = query(collection(db, "email_delivery_logs"), orderBy("sentAt", "desc"), limit(100));
    const querySnapshot = await getDocs(q);
    const logs: any[] = [];
    querySnapshot.forEach((doc) => {
      logs.push(doc.data());
    });
    return res.status(200).json(logs);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Retry a failed email log
app.post("/api/email-logs/retry/:logId", async (req, res) => {
  try {
    const { logId } = req.params;
    const logRef = doc(db, "email_delivery_logs", logId);
    const logSnap = await getDoc(logRef);

    if (!logSnap.exists()) {
      return res.status(404).json({ error: "Email delivery log not found." });
    }

    const logData = logSnap.data();
    const inquirySnap = await getDoc(doc(db, "inquiries", logData.inquiryId));
    
    if (!inquirySnap.exists()) {
      return res.status(404).json({ error: "Associated inquiry not found." });
    }

    const inq = inquirySnap.data();
    const appUrl = process.env.APP_URL || "https://www.gopaljikhopraudhyog.com";

    // Reconstruct email templates based on type
    let html = "";
    let text = "";

    if (logData.type === "admin_notification") {
      text = `New Inquiry Received\n\nInquiry ID: ${inq.inquiryId}\nName: ${inq.name}\nCompany: ${inq.companyName}\nEmail: ${inq.email}\nPhone: ${inq.phone}\nCity: ${inq.city}\nState: ${inq.state}\nProduct: ${inq.product}\nQuantity: ${inq.quantity}\nMessage: ${inq.message}`;
      html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5d5bc; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #6B4A2E; color: #fff; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">New B2B Inquiry Received (Retried)</h2>
          </div>
          <div style="padding: 24px; background-color: #faf7f2;">
            <strong>Inquiry ID: ${inq.inquiryId}</strong>
            <p>Name: ${inq.name}</p>
            <p>Product: ${inq.product}</p>
            <p>Quantity: ${inq.quantity}</p>
            <p>Message: ${inq.message}</p>
            <div style="text-align: center; margin-top:20px;">
              <a href="${appUrl}/login" style="background-color: #6B4A2E; color: white; padding: 10px 20px; text-decoration: none; border-radius: 20px;">Access Dashboard</a>
            </div>
          </div>
        </div>
      `;
    } else {
      text = `Dear ${inq.name},\n\nThank you for your inquiry.\n\nWe have successfully received your request.\n\nInquiry ID:\n${inq.inquiryId}\n\nOur team will review your inquiry and contact you shortly.`;
      html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5d5bc; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #6B4A2E; color: #fff; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Inquiry Confirmed</h2>
          </div>
          <div style="padding: 24px; background-color: #faf7f2;">
            <p>Dear ${inq.name},</p>
            <p>Thank you for submitting your inquiry (${inq.inquiryId}). Our teams are processing it now.</p>
          </div>
        </div>
      `;
    }

    const deliveryResult = await sendMail({
      to: logData.to,
      subject: logData.subject,
      html,
      text
    });

    const newRetryCount = (logData.retryCount || 0) + 1;

    await updateDoc(logRef, {
      status: deliveryResult.success ? "Success" : "Failed",
      error: deliveryResult.error || null,
      method: deliveryResult.method,
      retryCount: newRetryCount,
      lastRetriedAt: new Date().toISOString()
    });

    return res.status(200).json({ 
      success: deliveryResult.success, 
      error: deliveryResult.error,
      retryCount: newRetryCount 
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Vite Middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Gopalji Server] Running on http://localhost:${PORT}`);
  });
}

setupVite();
