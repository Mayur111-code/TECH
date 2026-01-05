import { motion } from 'framer-motion';
import { Code, Cpu, Zap, Database, Shield, Cloud, Sparkles, CpuIcon as CpuIconType, Settings, BarChart3 } from 'lucide-react';

const ServiceHero = () => {
  const floatingCards = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Clean Code",
      subtitle: "Development",
      color: "from-cyan-500 to-blue-600",
      position: "top-10 right-5 lg:right-20",
      animation: { y: [0, -20, 0], x: [0, 15, 0] }
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "AI Powered",
      subtitle: "Automation",
      color: "from-purple-500 to-pink-600",
      position: "top-1/3 left-5 lg:left-10",
      animation: { y: [0, -15, 0], x: [0, -10, 0] }
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Fast Workflow",
      subtitle: "Performance",
      color: "from-amber-500 to-orange-600",
      position: "bottom-1/3 right-10 lg:right-25",
      animation: { y: [0, 15, 0], x: [0, -8, 0] }
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Big Data",
      subtitle: "Analytics",
      color: "from-emerald-500 to-teal-600",
      position: "bottom-20 left-0 lg:left-15",
      animation: { y: [0, 20, 0], x: [0, 12, 0] }
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 pt-24 pb-20">
      
      {/* 🌌 Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px),
                             linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
          }}
        ></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              y: [null, `-${Math.random() * 100}px`],
              x: [null, `-${Math.random() * 100}px`],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800 mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
              Digital Excellence
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1]"
          >
            <span className="text-white">Our</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Digital
            </span>
            <br />
            <span className="text-white">Expertise</span>
            <span className="text-cyan-400">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl text-gray-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            We deliver cutting-edge software solutions and digital experiences that propel your business into the future.
          </motion.p>

          {/* Tech Stack Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            {['React', 'Node.js', 'AWS', 'AI/ML', 'Blockchain', 'IoT'].map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-gray-300 text-sm font-medium hover:border-cyan-500/30 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Visual with Floating Elements */}
        <div className="relative flex justify-center items-center h-[500px] lg:h-[600px]">
          
          {/* Main 3D Illustration Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Glow Effect Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-[3rem]"></div>
            
            {/* Main Image */}
            <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-800 shadow-2xl shadow-cyan-900/20">
              <img 
                src="services.jpg" 
                alt="Digital Solutions 3D"
                className="w-full h-auto opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent"></div>
            </div>

            {/* Floating Cards */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                className={`absolute ${card.position} z-30`}
                animate={card.animation}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              >
                <div className="group relative">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                  
                  {/* Card Content */}
                  <div className="relative bg-gray-900/80 backdrop-blur-xl p-4 rounded-2xl border border-gray-800/50 shadow-2xl hover:border-gray-700 transition-all duration-300 min-w-[160px]">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.color} mb-3`}>
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {card.subtitle}
                      </p>
                      <p className="font-bold text-white text-lg mt-1">
                        {card.title}
                      </p>
                    </div>
                    
                    {/* Connector Line (Optional) */}
                    <div className="absolute -bottom-2 left-1/2 w-20 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent -translate-x-1/2"></div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Central Floating Element */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="flex items-center gap-3 px-6 py-3 bg-gray-900/90 backdrop-blur-xl rounded-full border border-gray-800 shadow-xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 rounded-full blur-md"></div>
                  <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="text-white font-bold text-sm">Real-time Analytics</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Background Decorative Elements */}
          <div className="absolute -z-10 w-[120%] h-[120%]">
            {/* Circular Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-gray-800/30 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] border border-gray-800/20 rounded-full"
            ></motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-500 rounded-full mt-2"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServiceHero;