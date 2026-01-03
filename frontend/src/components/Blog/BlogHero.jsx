import { motion } from 'framer-motion';
import { BookOpen, PenTool, Share2, Sparkles, Zap, TrendingUp, Users, Clock, MessageSquare, Rocket, Layers } from 'lucide-react';

const BlogHero = () => {
  const floatingElements = [
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: "Latest News",
      color: "from-orange-500 to-amber-600",
      position: "top-5 right-5 lg:top-10 lg:right-20",
      animation: { y: [0, -15, 0], x: [0, 10, 0] },
      delay: 0
    },
    {
      icon: <PenTool className="w-4 h-4" />,
      text: "Coding Tips",
      color: "from-yellow-500 to-orange-600",
      position: "bottom-20 left-5 lg:bottom-1/3 lg:left-10",
      animation: { y: [0, 15, 0], x: [0, -8, 0] },
      delay: 1
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      text: "Tech Trends",
      color: "from-rose-500 to-pink-600",
      position: "top-1/4 left-10 lg:top-1/3 lg:left-20",
      animation: { y: [0, -12, 0], x: [0, 12, 0] },
      delay: 0.5
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      text: "AI Insights",
      color: "from-cyan-500 to-blue-600",
      position: "bottom-10 right-10 lg:bottom-20 lg:right-25",
      animation: { y: [0, -18, 0], x: [0, -15, 0] },
      delay: 1.5
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900 pt-24 pb-10">
      
      {/* 🌅 Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-yellow-900/10"></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-orange-400 rounded-full"
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
            style={{ opacity: Math.random() * 0.3 + 0.1 }}
          />
        ))}
        
        {/* Animated Orbs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-yellow-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-3 px-5 py-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800 mb-8 group hover:border-orange-500/50 transition-all cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full blur-md"></div>
              <div className="relative w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">
              Knowledge Hub
            </span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: i * 0.1, repeat: Infinity, duration: 1.5 }}
                  className="w-1 h-1 bg-orange-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-8"
          >
            <span className="text-white">Tech</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
              Insights
            </span>
            <br />
            <span className="text-white">& Digital</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Wisdom
            </span>
            <span className="text-orange-400 animate-pulse">.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10"
          >
            Dive into cutting-edge tech trends, expert coding insights, and strategic growth perspectives from industry leaders.
          </motion.p>

          {/* Stats & Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center gap-8">
              {[
                { icon: <Users className="w-5 h-5" />, text: "10K+ Readers" },
                { icon: <Clock className="w-5 h-5" />, text: "Weekly Updates" },
                { icon: <Rocket className="w-5 h-5" />, text: "Industry Experts" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-700">
                    <div className="text-orange-400">{feature.icon}</div>
                  </div>
                  <span className="text-gray-300 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
            
            
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Illustration */}
        <div className="relative flex justify-center items-center h-[500px] lg:h-[600px]">
          
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 blur-3xl rounded-[3rem] group-hover:scale-110 transition-transform duration-700"></div>
            
            {/* Main Image with Frame */}
            <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-gray-800/50 shadow-2xl shadow-orange-900/20 group-hover:border-amber-500/30 transition-all duration-500">
              <img 
                src="/blog.jpg" 
                alt="Blog Insights 3D"
                className="w-full h-auto brightness-90 group-hover:brightness-110 transition-all duration-700"
              />
              
              {/* Interactive Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Animated Reading Progress */}
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"
              />
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

            {/* Trending Badge */}
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
              className="absolute -top-3 -right-3 z-20"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full blur-md"></div>
                <div className="relative px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-2xl flex items-center gap-2">
                  <Zap className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-xs">TRENDING</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Animated Text Background */}
          <div className="absolute -z-10 w-[150%] h-[150%] opacity-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-[12rem] font-black text-gray-800 whitespace-nowrap"
                style={{ 
                  fontFamily: 'monospace',
                  letterSpacing: '2rem'
                }}
              >
                BLOG INSIGHTS
              </motion.div>
            </div>
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
          <span className="text-gray-500 text-xs uppercase tracking-widest mb-4">Scroll to Explore</span>
          <div className="relative">
            <div className="w-1 h-24 bg-gradient-to-b from-orange-500/20 via-amber-500/20 to-transparent rounded-full overflow-hidden">
              <motion.div
                animate={{ y: [0, 80, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-8 bg-gradient-to-b from-orange-400 to-amber-400 rounded-full"
              />
            </div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogHero;