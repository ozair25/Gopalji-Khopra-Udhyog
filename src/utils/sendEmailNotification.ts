import emailjs from '@emailjs/browser'

export const sendEmailNotification = async (enquiryData: any) => {
  try {
    await emailjs.send(
      'service_wsvjnjd',
      'template_rum1itk',
      {
        to_email: 'sayedozair25@gmail.com',
        from_name: enquiryData.name || 'Not provided',
        from_phone: enquiryData.phone || 'Not provided',
        from_email: enquiryData.email || 'Not provided',
        product_name: enquiryData.product || enquiryData.productName || enquiryData.productRequirement || 'General Enquiry',
        category: enquiryData.category || 'General',
        message: enquiryData.message || enquiryData.description || 'No message',
        enquiry_date: new Date().toLocaleString('en-IN'),
        admin_panel_url: 'https://gopaljikhopra.netlify.app/login',
      },
      '3rC01z1LMg29sQYPh'
    )
    console.log('Email notification sent successfully')
  } catch (error) {
    console.error('Email failed silently:', error)
  }
}
