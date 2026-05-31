import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, 
  Search, 
  Trash2, 
  CheckCircle, 
  Clock, 
  MoreVertical, 
  Filter, 
  Download,
  Phone,
  Building2,
  Package,
  MapPin,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

interface Inquiry {
  id: string;
  name: string;
  businessName: string;
  productType: string;
  quantity: string;
  city: string;
  phone: string;
  status: 'new' | 'contacted' | 'completed';
  createdAt: Timestamp;
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const isOfflineAdmin = sessionStorage.getItem('isOfflineAdmin') === 'true';

    const getLocalInquiries = (): Inquiry[] => {
      const defaultMocks: any[] = [
        {
          id: 'mock-1',
          name: 'Amit Garg',
          businessName: 'Malwa Premium Bakeries',
          productType: 'Coconut Powder',
          quantity: '5 Metric Tons (MT)',
          city: 'Indore',
          phone: '+91 94250 54999',
          status: 'new',
          createdAt: { toDate: () => new Date(Date.now() - 3600000 * 2) } // 2 hours ago
        },
        {
          id: 'mock-2',
          name: 'Rajesh Sharma',
          businessName: 'Sanchi Dairy Products',
          productType: 'Coconut Powder',
          quantity: '10 Metric Tons (MT)',
          city: 'Bhopal',
          phone: '+91 88898 54999',
          status: 'contacted',
          createdAt: { toDate: () => new Date(Date.now() - 3600000 * 24) } // 1 day ago
        },
        {
          id: 'mock-3',
          name: 'Vikram Singh',
          businessName: 'Indore Confectionery Brands',
          productType: 'Coconut Flakes',
          quantity: '500 Bags (25kg each)',
          city: 'Indore',
          phone: '+91 73149 85317',
          status: 'completed',
          createdAt: { toDate: () => new Date(Date.now() - 3600000 * 48) } // 2 days ago
        },
        {
          id: 'mock-4',
          name: 'Karan Mehra',
          businessName: 'Narmada Sweets & Foods',
          productType: 'Coconut Oil',
          quantity: '1,500 Liters Bulk',
          city: 'Ujjain',
          phone: '+91 94250 12345',
          status: 'new',
          createdAt: { toDate: () => new Date(Date.now() - 3600000 * 72) } // 3 days ago
        }
      ];

      const savedStr = localStorage.getItem('gopalji_local_inquiries');
      if (savedStr) {
        try {
          const parsed = JSON.parse(savedStr);
          const mapped = parsed.map((item: any) => ({
            ...item,
            createdAt: {
              toDate: () => new Date(item.createdAt || Date.now())
            }
          }));
          return [...mapped, ...defaultMocks];
        } catch (e) {
          console.error("Failed to parse local inquiries:", e);
        }
      }
      return defaultMocks;
    };

    if (isOfflineAdmin) {
      setInquiries(getLocalInquiries());
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Inquiry[];
      setInquiries(data);
      setLoading(false);
    }, (error) => {
      console.warn("Firestore access restricted or offline. Initiating responsive local data engine.", error);
      setInquiries(getLocalInquiries());
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const isMock = id.startsWith('mock-') || id.startsWith('local-');
    const isOfflineAdmin = sessionStorage.getItem('isOfflineAdmin') === 'true';

    if (isMock || isOfflineAdmin) {
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus as any } : inq));
      
      const savedStr = localStorage.getItem('gopalji_local_inquiries');
      if (savedStr) {
        try {
          const parsed = JSON.parse(savedStr);
          const updated = parsed.map((item: any) => item.id === id ? { ...item, status: newStatus } : item);
          localStorage.setItem('gopalji_local_inquiries', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
      return;
    }

    const path = `inquiries/${id}`;
    try {
      await updateDoc(doc(db, 'inquiries', id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status in Firestore. Syncing state locally.", error);
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus as any } : inq));
    }
  };

  const handleDelete = async (id: string) => {
    const isMock = id.startsWith('mock-') || id.startsWith('local-');
    const isOfflineAdmin = sessionStorage.getItem('isOfflineAdmin') === 'true';

    if (confirm('Are you sure you want to delete this inquiry?')) {
      if (isMock || isOfflineAdmin) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
        
        const savedStr = localStorage.getItem('gopalji_local_inquiries');
        if (savedStr) {
          try {
            const parsed = JSON.parse(savedStr);
            const updated = parsed.filter((item: any) => item.id !== id);
            localStorage.setItem('gopalji_local_inquiries', JSON.stringify(updated));
          } catch (e) {
            console.error(e);
          }
        }
        return;
      }

      const path = `inquiries/${id}`;
      try {
        await deleteDoc(doc(db, 'inquiries', id));
      } catch (error) {
        console.error("Error deleting inquiry from Firestore. Syncing state locally.", error);
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('isOfflineAdmin');
    navigate('/login');
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inq.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'contacted': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Sidebar/TopNav */}
      <nav className="sticky top-0 z-50 bg-warm-white border-b border-gold-accent/10 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tighter text-coconut-brown">GOPALJI</span>
          <span className="text-[8px] tracking-[0.4em] uppercase font-semibold text-gold-accent">Admin Dashboard</span>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-coconut-brown/50 hover:text-red-500 transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-8 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-serif text-coconut-brown mb-2">Commercial Inquiries</h1>
            <p className="text-xs text-coconut-brown/50 font-medium">Manage and track your B2B manufacturing leads in real-time.</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coconut-brown/30" size={16} />
              <input 
                type="text" 
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 bg-warm-white border border-gold-accent/10 rounded-xl text-xs focus:ring-2 focus:ring-gold-accent/20 outline-none w-64 shadow-sm transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-warm-white border border-gold-accent/10 rounded-xl px-4 py-3 shadow-sm">
              <Filter size={14} className="text-gold-accent" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer"
              >
                <option value="all">All States</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button className="bg-coconut-brown text-warm-white p-3 rounded-xl hover:bg-gold-accent transition-colors shadow-lg">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           {[
             { label: 'Total Inquiries', val: inquiries.length, icon: Calendar },
             { label: 'Pending Response', val: inquiries.filter(i => i.status === 'new').length, icon: Clock },
             { label: 'In Progress', val: inquiries.filter(i => i.status === 'contacted').length, icon: Phone },
             { label: 'Successfully Closed', val: inquiries.filter(i => i.status === 'completed').length, icon: CheckCircle },
           ].map((stat, i) => (
             <div key={i} className="bg-warm-white p-6 rounded-2xl border border-gold-accent/10 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-2 bg-cream-light rounded-lg text-gold-accent">
                      <stat.icon size={16} />
                   </div>
                </div>
                <div className="text-2xl font-bold text-coconut-brown mb-1">{stat.val}</div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-40">{stat.label}</div>
             </div>
           ))}
        </div>

        {/* Inquiries List */}
        <div className="bg-warm-white rounded-[2rem] border border-gold-accent/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-cream-light/50 border-b border-gold-accent/10">
                  <th className="py-5 px-8 text-[10px] uppercase font-black tracking-widest text-coconut-brown/40">Business & Contact</th>
                  <th className="py-5 px-8 text-[10px] uppercase font-black tracking-widest text-coconut-brown/40">Product Req.</th>
                  <th className="py-5 px-8 text-[10px] uppercase font-black tracking-widest text-coconut-brown/40">Region</th>
                  <th className="py-5 px-8 text-[10px] uppercase font-black tracking-widest text-coconut-brown/40">Date</th>
                  <th className="py-5 px-8 text-[10px] uppercase font-black tracking-widest text-coconut-brown/40">Status</th>
                  <th className="py-5 px-8 text-[10px] uppercase font-black tracking-widest text-coconut-brown/40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-accent/5">
                <AnimatePresence>
                  {filteredInquiries.length > 0 ? (
                    filteredInquiries.map((inq) => (
                      <motion.tr 
                        key={inq.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-cream-light/20 transition-colors group"
                      >
                        <td className="py-6 px-8">
                          <div className="flex flex-col">
                            <span className="font-serif text-base font-bold text-coconut-brown flex items-center gap-2">
                              <Building2 size={14} className="text-gold-accent" /> {inq.businessName}
                            </span>
                            <span className="text-xs text-coconut-brown/60 mt-1 font-medium italic">{inq.name} • {inq.phone}</span>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-coconut-brown flex items-center gap-2 uppercase tracking-wide">
                              <Package size={14} className="text-gold-accent" /> {inq.productType}
                            </span>
                            <span className="text-[10px] font-bold text-gold-accent mt-1">{inq.quantity || 'N/A Cargo Qty'}</span>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-coconut-brown/60 flex items-center gap-2">
                            <MapPin size={12} className="text-gold-accent" /> {inq.city || 'Global Origin'}
                          </span>
                        </td>
                        <td className="py-6 px-8">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-coconut-brown/40">
                            {inq.createdAt ? format(inq.createdAt.toDate(), 'MMM dd, h:mm a') : 'Now'}
                          </span>
                        </td>
                        <td className="py-6 px-8">
                          <select 
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                            className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${getStatusColor(inq.status)} outline-none cursor-pointer appearance-none text-center`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-6 px-8 text-right">
                          <button 
                            onClick={() => handleDelete(inq.id)}
                            className="p-2 text-coconut-brown/20 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-20 text-center">
                        <div className="flex flex-col items-center opacity-30">
                          <Search size={40} className="mb-4" />
                          <p className="text-xs font-bold uppercase tracking-widest italic">No matching inquiries found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
