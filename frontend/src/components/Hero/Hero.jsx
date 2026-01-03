import { ArrowRight, Sparkles, Zap, ShieldCheck, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-zinc-950 pt-20">
      
      {/* Subtle Dark Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-950/30 rounded-full filter blur-[120px] opacity-40 animate-soft-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-950/30 rounded-full filter blur-[120px] opacity-40 animate-soft-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-zinc-400 text-sm font-medium">
            <Sparkles size={16} className="text-indigo-400" /> 
            Top-Rated Digital Agency
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight">
            We Design <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Future Tech.
            </span>
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            High-performance applications and immersive user experiences that help your business lead in the digital space.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link to="/contact">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-500 transition-all">
                Start Your Journey <ArrowRight size={20} />
              </button>
            </Link>
            
            <Link to="/projects">
              <button className="bg-zinc-900 text-zinc-100 border border-zinc-800 px-8 py-4 rounded-xl font-semibold hover:bg-zinc-800 transition-all">
                Our Work
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: 3D Elements & Visuals */}
        <div className="relative group">
          
          {/* Main Hero Illustration */}
          <div className="relative z-10 animate-float">
            <img 
              src="/home.jpg" 
              alt="3D Development Concept"
              className="w-full max-w-[550px] mx-auto drop-shadow-[0_35px_35px_rgba(99,102,241,0.2)]"
            />
          </div>

          {/* 4 Floating Cards (Original 2 + 2 new ones) */}
          <div className="absolute top-10 -right-5 md:right-5 bg-zinc-900/80 backdrop-blur-xl p-4 rounded-2xl border border-zinc-800 animate-float [animation-delay:1.5s] z-20">
             <div className="flex items-center gap-3">
               <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20"><ShieldCheck size={20} className="text-emerald-400"/></div>
               <div>
                 <p className="text-xs text-zinc-500">STATUS</p>
                 <p className="text-sm font-semibold text-zinc-100">Enterprise Secure</p>
               </div>
             </div>
          </div>

          <div className="absolute bottom-10 -left-5 md:left-5 bg-zinc-900/80 backdrop-blur-xl p-4 rounded-2xl border border-zinc-800 animate-float [animation-delay:0.5s] z-20">
             <div className="flex items-center gap-3">
               <div className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/20"><Zap size={20} className="text-amber-400"/></div>
               <div>
                 <p className="text-xs text-zinc-500">PERFORMANCE</p>
                 <p className="text-sm font-semibold text-zinc-100">Lightning Fast</p>
               </div>
             </div>
          </div>

          {/* New Floating Card 1 */}
          <div className="absolute top-32 left-5 md:left-10 bg-zinc-900/80 backdrop-blur-xl p-4 rounded-2xl border border-zinc-800 animate-float [animation-delay:0.8s] z-20">
             <div className="flex items-center gap-3">
               <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20"><Cpu size={20} className="text-indigo-400"/></div>
               <div>
                 <p className="text-xs text-zinc-500">TECHNOLOGY</p>
                 <p className="text-sm font-semibold text-zinc-100">AI Powered</p>
               </div>
             </div>
          </div>

          {/* New Floating Card 2 */}
          <div className="absolute bottom-32 right-5 md:right-10 bg-zinc-900/80 backdrop-blur-xl p-4 rounded-2xl border border-zinc-800 animate-float [animation-delay:1.2s] z-20">
             <div className="flex items-center gap-3">
               <div className="bg-blue-500/10 p-2 rounded-xl border border-blue-500/20"><Globe size={20} className="text-blue-400"/></div>
               <div>
                 <p className="text-xs text-zinc-500">REACH</p>
                 <p className="text-sm font-semibold text-zinc-100">Global Scale</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;