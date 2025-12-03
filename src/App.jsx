import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Menu, 
  X, 
  Calendar, 
  Users, 
  Image as ImageIcon, 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube, 
  ArrowRight, 
  Aperture,
  ChevronRight,
  MapPin,
  ExternalLink
} from 'lucide-react';

// --- Assets & Data ---

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Intro to ISO & Shutter",
    date: "Oct 25, 2025",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    desc: "A beginner's workshop on mastering the exposure triangle."
  },
  {
    id: 2,
    title: "Old Dhaka Photo Walk",
    date: "Nov 02, 2025",
    status: "Registration Open",
    image: "https://images.unsplash.com/photo-1572088880503-4c9197c36979?auto=format&fit=crop&q=80&w=800",
    desc: "Capture the heritage and chaos of Old Dhaka streets."
  },
  {
    id: 3,
    title: "Annual Exhibition 2025",
    date: "Dec 15, 2025",
    status: "Submission Open",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=800",
    desc: "Showcase your best shots at the college auditorium."
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1500622944204-b135684e997f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
];

const EXECUTIVES = [
  { name: "Tahmid Khan", role: "President", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tahmid" },
  { name: "Sarah Ahmed", role: "Gen. Secretary", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { name: "Rafiqul Islam", role: "Treasurer", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafiq" },
  { name: "Ayesha Noor", role: "Event Head", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha" },
];

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

// --- Components ---

const Navbar = ({ activePage, setActivePage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Events', 'Gallery', 'Team', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0b0c15]/90 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('Home')}>
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Aperture className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider font-sans">GSCPC</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Est. 2015</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActivePage(link)}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${activePage === link ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
            >
              {link}
              {activePage === link && (
                <motion.div 
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-white cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0b0c15] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => { setActivePage(link); setMobileMenuOpen(false); }}
                  className={`text-left text-lg font-medium ${activePage === link ? 'text-cyan-400' : 'text-gray-300'}`}
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ setActivePage }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#06070a]"></div>
        {/* Grid Pattern approximation */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`, 
               backgroundSize: '40px 40px' 
             }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06070a]/50 to-[#06070a]"></div>
        {/* Glow Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
              Science meets Art
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
            Capture the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 animate-gradient-x">Unseen</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Welcome to the Government Science College Photography Club. We bridge the gap between technical precision and artistic expression.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActivePage('Events')}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Explore Events <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActivePage('Gallery')}
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View Gallery
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h3 className="text-cyan-400 font-medium tracking-widest uppercase text-sm mb-3">{subtitle}</h3>
    <h2 className="text-4xl md:text-5xl font-bold text-white">{title}</h2>
    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-6 rounded-full" />
  </div>
);

const About = () => {
  return (
    <section className="py-24 bg-[#0b0c15] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-cyan-400 font-medium tracking-widest uppercase text-sm mb-3">Who We Are</h3>
            <h2 className="text-4xl font-bold text-white mb-6">More Than Just a Club</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Established in 2015, GSCPC has been the sanctuary for aspiring photographers within the Government Science College campus. We believe photography is not just about clicking a button; it's about understanding light, composition, and the story behind the frame.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              From organizing national-level exhibitions to conducting weekly workshops on post-processing and gear, we nurture talent from the ground up.
            </p>
            
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <h4 className="text-3xl font-bold text-white">500+</h4>
                <p className="text-gray-500 text-sm">Members</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white">50+</h4>
                <p className="text-gray-500 text-sm">Awards</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white">10+</h4>
                <p className="text-gray-500 text-sm">Exhibitions</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-30 blur-lg transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800" 
              alt="Club Activity" 
              className="relative rounded-2xl shadow-2xl w-full object-cover h-[400px] grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Events = () => {
  return (
    <section className="py-24 bg-[#06070a]">
      <div className="container mx-auto px-6">
        <SectionHeader title="Upcoming Events" subtitle="Mark Your Calendar" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_EVENTS.map((event) => (
            <motion.div 
              key={event.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group bg-[#0b0c15] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                  {event.status}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-cyan-400 text-sm mb-3 font-medium">
                  <Calendar className="w-4 h-4" /> {event.date}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{event.desc}</p>
                <button className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2 group-hover:text-cyan-400">
                  Register Now <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section className="py-24 bg-[#0b0c15]">
      <div className="container mx-auto px-6">
        <SectionHeader title="Visual Stories" subtitle="Captured by Members" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
          {GALLERY_IMAGES.map((src, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-xl cursor-pointer ${index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img src={src} alt="Gallery" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-lg">Urban Perspectives</h4>
                <p className="text-gray-300 text-sm">By Member Name</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300">
            View All Collections
          </button>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  return (
    <section className="py-24 bg-[#06070a]">
      <div className="container mx-auto px-6">
        <SectionHeader title="Executive Committee" subtitle="The Minds Behind" />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXECUTIVES.map((exec, idx) => (
            <motion.div 
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group text-center"
            >
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src={exec.img} alt={exec.name} className="relative w-full h-full rounded-full border-4 border-[#0b0c15] bg-[#0b0c15] object-cover" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{exec.name}</h3>
              <p className="text-cyan-400 text-sm font-medium uppercase tracking-wider mb-4">{exec.role}</p>
              <div className="flex justify-center gap-4 text-gray-500">
                <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-24 bg-[#0b0c15]">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-[#1e1e2e] to-[#0f0f16] rounded-3xl p-8 md:p-16 border border-white/5 relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Revolution</h2>
              <p className="text-gray-400 mb-8">
                Ready to take your photography to the next level? Membership for the 2026 session is now open. Contact us for collaborations or queries.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-lg text-cyan-400"><MapPin className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-white font-bold">Location</h4>
                    <p className="text-gray-400 text-sm">Tejgaon, Dhaka 1215, Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-lg text-purple-400"><Mail className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-white font-bold">Email Us</h4>
                    <p className="text-gray-400 text-sm">contact@gscpc.org</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" />
                <input type="text" placeholder="Class/Roll" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" />
              <textarea rows="4" placeholder="Message" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"></textarea>
              <button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#06070a] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Aperture className="text-cyan-400 w-8 h-8" />
              <h2 className="text-2xl font-bold text-white">GSCPC</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              The official Photography Club of Government Science College. We inspire, create, and exhibit the art of visual storytelling.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Upcoming Events</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Our Gallery</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Join the Club</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Executive Panel</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Photography Basics</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Editing Tutorials</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Gear Guide</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Alumni Network</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2025 Government Science College Photography Club. All rights reserved.</p>
          <p>Designed with <span className="text-red-500">❤</span> for GSC</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  // Simple SPA State Router
  const [activePage, setActivePage] = useState('Home');

  // Helper to render specific section or scroll to it
  // In a real multi-page app, this would be <Routes>
  const renderContent = () => {
    // For this single page landing style, we will stack them but jump to section on navigation
    // However, to mimic the multi-page feel request, we can conditionally render components
    // But a Landing Page flow is usually better for this aesthetic.
    // Let's do a Hybrid: Home shows all, others show specific top content.
    
    // Actually, best for this request: A long scrolling landing page, 
    // where clicking nav items scrolls to section.
    // BUT the user asked for "Multi-page SPA". 
    // I will implement conditional rendering to show distinct "Pages".
    
    switch (activePage) {
      case 'Home':
        return (
          <>
            <Hero setActivePage={setActivePage} />
            <About />
            <Events />
            <Gallery />
            <Team />
            <Contact />
          </>
        );
      case 'About':
        return <><div className="pt-20"><About /></div><Footer /></>; // Wrap to avoid double footer if I put footer outside
      case 'Events':
        return <><div className="pt-20"><Events /></div><Contact /><Footer /></>;
      case 'Gallery':
        return <><div className="pt-20"><Gallery /></div><Footer /></>;
      case 'Team':
        return <><div className="pt-20"><Team /></div><Footer /></>;
      case 'Contact':
        return <><div className="pt-20"><Contact /></div><Footer /></>;
      default:
        return <Hero setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#06070a] text-white font-sans selection:bg-cyan-500/30">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activePage === 'Home' ? (
              // Full Landing Page Flow
              <>
                <Hero setActivePage={setActivePage} />
                <About />
                <Events />
                <Gallery />
                <Team />
                <Contact />
                <Footer />
              </>
            ) : (
              // Individual Page Views
               renderContent()
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}