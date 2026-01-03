// import { motion } from 'framer-motion';
// import { Mail, MessageSquare, Send, Sparkles } from 'lucide-react';

// const ContactHero = () => {
//   return (
//     <section className="relative min-h-[60vh] lg:h-[75vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-12">
      
//       {/* 🟢 Background Soft Gradients (Green/Teal for Trust) */}
//       <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-50 rounded-full filter blur-[100px] opacity-70"></div>
//       <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-50 rounded-full filter blur-[100px] opacity-70"></div>

//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 z-10">
        
//         {/* Left Side: Text */}
//         <motion.div 
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center lg:text-left order-2 lg:order-1"
//         >
//           <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full text-emerald-700 text-xs font-bold mb-6">
//             <Sparkles size={14} /> LET'S CONNECT
//           </div>
//           <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">
//             Have a <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Project?</span>
//           </h1>
//           <p className="mt-6 text-lg text-slate-500 font-medium max-w-md mx-auto lg:mx-0">
//             Tumcha idea amhala sanga, apan tyala digital reality madhe convert karu.
//           </p>
//         </motion.div>

//         {/* Right Side: 3D Illustration */}
//         <div className="relative flex justify-center items-center order-1 lg:order-2">
//           <motion.div 
//             animate={{ y: [0, -20, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <img 
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb7k11s02w_5IT6CPGEuzjIN_CR_e0iiSPpg&s" 
//               alt="Contact 3D"
//               className="w-72 lg:w-[420px] drop-shadow-2xl"
//             />
//           </motion.div>

//           {/* Floating Bubble */}
//           <motion.div 
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 3, repeat: Infinity }}
//             className="absolute -bottom-5 right-10 hidden md:block bg-white p-4 rounded-2xl shadow-2xl border border-slate-50"
//           >
//             <div className="flex items-center gap-3">
//               <div className="bg-emerald-500 p-2 rounded-lg text-white"><MessageSquare size={18}/></div>
//               <span className="font-bold text-slate-700 text-sm font-mono tracking-tighter">Quick Response</span>
//             </div>
//           </motion.div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default ContactHero;


import { motion } from 'framer-motion';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Globe,
  Clock,
  Shield,
  Zap,
  Users,
  ArrowRight
} from 'lucide-react';

const ContactHero = () => {
  const floatingElements = [
    {
      icon: <MessageSquare className="w-4 h-4" />,
      text: "Quick Response",
      color: "from-emerald-500 to-teal-600",
      position: "top-10 right-5 lg:top-20 lg:right-10",
      animation: { y: [0, -15, 0], x: [0, 8, 0] },
      delay: 0
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: "24/7 Support",
      color: "from-blue-500 to-cyan-600",
      position: "bottom-20 left-5 lg:bottom-32 lg:left-10",
      animation: { y: [0, 15, 0], x: [0, -10, 0] },
      delay: 1
    },
    {
      icon: <Shield className="w-4 h-4" />,
      text: "Secure Communication",
      color: "from-violet-500 to-indigo-600",
      position: "top-1/3 left-10 lg:top-1/3 lg:left-20",
      animation: { y: [0, -12, 0], x: [0, 10, 0] },
      delay: 0.5
    },
    {
      icon: <Globe className="w-4 h-4" />,
      text: "Global Reach",
      color: "from-amber-500 to-orange-600",
      position: "bottom-10 right-10 lg:bottom-20 lg:right-20",
      animation: { y: [0, -20, 0], x: [0, -12, 0] },
      delay: 1.5
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900 pt-24 pb-10">
      
      {/* 🌌 Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-teal-900/10"></div>
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-emerald-400 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              y: [null, `-${Math.random() * 100}px`],
              x: [null, `${Math.random() * 50 - 25}px`],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ opacity: Math.random() * 0.4 + 0.1 }}
          />
        ))}
        
        {/* Glowing Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800 mb-8 group hover:border-emerald-500/50 transition-all cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full blur-md"></div>
              <div className="relative w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">
              Ready to Collaborate
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-6"
          >
            <span className="text-white">Let's Build</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Together
            </span>
            <br />
            <span className="text-white">Your Next</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              Digital Success
            </span>
            <span className="text-emerald-400 animate-pulse">.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10"
          >
            Share your vision with us, and let's transform it into a cutting-edge digital reality that drives growth and innovation.
          </motion.p>

          {/* Stats & Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-8"
          >
            <div className="flex flex-wrap items-center gap-6">
              {[
                { icon: <Zap className="w-5 h-5" />, text: "Fast Turnaround" },
                { icon: <Users className="w-5 h-5" />, text: "Expert Team" },
                { icon: <Shield className="w-5 h-5" />, text: "NDA Protected" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-700 group hover:border-emerald-500/30 transition-colors">
                    <div className="text-emerald-400 group-hover:text-emerald-300">{feature.icon}</div>
                  </div>
                  <span className="text-gray-300 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
            
           
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Illustration */}
        <div className="relative flex justify-center items-center h-[500px] lg:h-[600px]">
          
          {/* Main Illustration Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl rounded-[3rem] group-hover:scale-110 transition-transform duration-700"></div>
            
            {/* Main Image with Frame */}
            <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-gray-800/50 shadow-2xl shadow-emerald-900/20 group-hover:border-emerald-500/30 transition-all duration-500">
              <img 
                src="/contact.jpg" 
                alt="Contact Collaboration 3D"
                className="w-full h-auto brightness-90 group-hover:brightness-110 transition-all duration-700"
              />
              
              {/* Interactive Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Animated Connection Lines */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: i * 0.3 }}
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at ${20 + i * 30}% ${30 + i * 15}%, #10b981 0%, transparent 50%)`,
                      filter: 'blur(20px)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            {floatingElements.map((element, index) => (
              <motion.div
                key={index}
                className={`absolute ${element.position} z-30`}
                animate={element.animation}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: element.delay
                }}
              >
                <div className="group/element relative">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${element.color} rounded-2xl blur-xl opacity-0 group-hover/element:opacity-30 transition-opacity`}></div>
                  
                  {/* Element Content */}
                  <div className="relative bg-gray-900/80 backdrop-blur-xl p-3 rounded-2xl border border-gray-800/50 shadow-xl hover:border-gray-700 transition-all duration-300 flex items-center gap-3 min-w-[140px]">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${element.color}`}>
                      {element.icon}
                    </div>
                    <span className="font-bold text-white text-sm">{element.text}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Contact Badge */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 z-20"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full blur-md"></div>
                <div className="relative px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-2xl flex items-center gap-2">
                  <Send className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-xs">CONTACT</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Animated Connection Dots */}
          <div className="absolute -z-10 w-[120%] h-[120%]">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="absolute w-2 h-2 bg-emerald-400 rounded-full"
                style={{
                  left: `${10 + i * 10}%`,
                  top: `${20 + i * 8}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-500 text-xs uppercase tracking-widest mb-4">Get in Touch</span>
          <div className="relative">
            <div className="w-1 h-24 bg-gradient-to-b from-emerald-500/20 via-teal-500/20 to-transparent rounded-full overflow-hidden">
              <motion.div
                animate={{ y: [0, 80, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full"
              />
            </div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactHero;