import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Sparkles,
  ArrowRight,
  Globe,
  Shield,
  Zap,
  Code,
  Users,
  BookOpen
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/projects' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'Contact', path: '/contact' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
        { name: 'Partners', path: '/partners' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '/docs' },
        { name: 'API Reference', path: '/api' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Help Center', path: '/help' },
      ]
    }
  ];

  const contactInfo = [
    { icon: <MapPin className="w-4 h-4" />, text: 'Pune, Maharashtra, India', color: 'text-emerald-400' },
    { icon: <Phone className="w-4 h-4" />, text: '+91 7028507985', color: 'text-blue-400' },
    { icon: <Mail className="w-4 h-4" />, text: 'contact@infinatech.com', color: 'text-purple-400' },
    { icon: <Globe className="w-4 h-4" />, text: '24/7 Global Support', color: 'text-cyan-400' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
  ];

  const techStack = ['React', 'Node.js', 'AWS', 'MongoDB', 'Python', 'Docker', 'Kubernetes', 'GraphQL'];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black pt-32 pb-12 px-6 overflow-hidden">
      
      {/* 🌌 Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/5 via-transparent to-blue-900/5"></div>
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-emerald-400 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              y: [null, `-${Math.random() * 100}px`],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ opacity: Math.random() * 0.3 + 0.1 }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand & Social Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Logo */}
<div className="flex items-center gap-3">
  <motion.div
    whileHover={{ rotate: 10, scale: 1.1 }}
    className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 overflow-hidden relative"
  >
    {/* Fallback gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600" />
    
    {/* Logo image */}
    <img 
      src="/logo.jpg" 
      alt="Logo" 
      className="w-full h-full object-cover relative z-10"
      onError={(e) => {
        e.target.style.opacity = '0';
      }}
    />
    
   
    <Sparkles className="w-6 h-6 text-white absolute z-0" />
  </motion.div>
  <div>
                  <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    INFINA TECH
                  </h2>
                  <p className="text-gray-400 text-sm font-medium tracking-wider uppercase">
                    Digital Innovation
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed max-w-md">
                Crafting digital experiences that transform businesses and empower growth through cutting-edge technology and design.
              </p>

              {/* Tech Stack */}
              <div className="space-y-4">
                <p className="text-gray-300 text-sm font-bold uppercase tracking-wider">Built With</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gray-800/50 text-gray-300 text-xs font-bold rounded-lg border border-gray-700 hover:border-emerald-500/30 hover:text-emerald-300 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-gray-300 text-sm font-bold uppercase tracking-wider">Connect With Us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={i}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-emerald-500/20 hover:to-teal-500/20 hover:border hover:border-emerald-500/30 transition-all"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* Footer Link Columns */}
              {footerLinks.map((column, colIndex) => (
                <motion.div
                  key={colIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: colIndex * 0.1 }}
                  className="space-y-6"
                >
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full"></div>
                    {column.title}
                  </h4>
                  <ul className="space-y-4">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.path}
                          className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          <span className="font-medium">{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Contact Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
                  Contact Info
                </h4>
                <ul className="space-y-5">
                  {contactInfo.map((info, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className={`p-2 rounded-lg bg-gray-800/50 ${info.color}`}>
                        {info.icon}
                      </div>
                      <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                        {info.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Newsletter Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-6 lg:col-span-3 md:col-span-2"
              >
                <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
                  Stay Updated
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Get the latest tech insights and company updates delivered to your inbox.
                </p>
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <p className="text-gray-500 text-xs">
                    By subscribing, you agree to our Privacy Policy
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-12"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-gray-500 text-sm font-medium">
              © {currentYear} INFINA TECH. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Crafted with ❤️ in India
            </p>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-6 items-center"
          >
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((item, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors hover:underline"
              >
                {item}
              </a>
            ))}
            
            {/* Trust Badges */}
            <div className="flex items-center gap-4 pt-4 md:pt-0 border-t border-gray-800/50 md:border-none">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span className="text-gray-300 text-xs font-bold">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
                <Zap className="w-3 h-3 text-amber-400" />
                <span className="text-gray-300 text-xs font-bold">99.9% Uptime</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '100+', label: 'Projects Delivered', icon: <Code className="w-4 h-4" /> },
              { value: '50+', label: 'Happy Clients', icon: <Users className="w-4 h-4" /> },
              { value: '5+', label: 'Years Experience', icon: <BookOpen className="w-4 h-4" /> },
              { value: '24/7', label: 'Support Available', icon: <Sparkles className="w-4 h-4" /> },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-gray-800/30 rounded-xl">
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  {stat.icon}
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Back to Top */}
      <motion.button
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-2xl shadow-emerald-500/25 flex items-center justify-center z-40"
        aria-label="Back to top"
      >
        <ArrowRight className="w-5 h-5 text-white transform -rotate-90" />
      </motion.button>
    </footer>
  );
};

export default Footer;