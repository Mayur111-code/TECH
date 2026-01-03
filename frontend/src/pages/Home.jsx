import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Hero from '../components/Hero/Hero';
import { Sparkles, Zap, Cloud, Code, Globe, Shield } from 'lucide-react';

const Home = () => {
  const services = [
    { 
      title: 'Web Development', 
      desc: 'Modern, responsive websites with cutting-edge tech stacks',
      icon: <Code className="w-6 h-6" />,
      color: 'from-cyan-500 to-blue-600'
    },
    { 
      title: 'App Design', 
      desc: 'Intuitive UI/UX that engages and converts users',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      title: 'Cloud Solutions', 
      desc: 'Scalable infrastructure for enterprise-grade performance',
      icon: <Cloud className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      title: 'Cyber Security', 
      desc: 'Protection against modern digital threats',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600'
    },
    { 
      title: 'Digital Marketing', 
      desc: 'Data-driven strategies for maximum ROI',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-violet-500 to-indigo-600'
    },
    { 
      title: 'AI Integration', 
      desc: 'Smart automation and machine learning solutions',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-rose-500 to-fuchsia-600'
    }
  ];

  const stats = [
    { value: '100+', label: 'Projects Completed', suffix: '🚀' },
    { value: '50+', label: 'Happy Clients', suffix: '🌟' },
    { value: '99%', label: 'Client Satisfaction', suffix: '✨' },
    { value: '24/7', label: 'Support', suffix: '⚡' },
    { value: '5+', label: 'Years Experience', suffix: '🎯' },
    { value: '15+', label: 'Team Experts', suffix: '👨‍💻' }
  ];

  return (
    <div className="overflow-x-hidden bg-gray-950 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* 🚀 1. Hero Section */}
      <div className="relative z-10">
        <Hero />
      </div>

      {/* 🛠️ 2. Services Section */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-semibold mb-6">
              WHAT WE DO
            </span>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              Our <span className="text-cyan-400">Expertise</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Cutting-edge solutions tailored for the digital age
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-8 hover:border-gray-700 transition-all duration-300"
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Animated Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/50 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-purple-500/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-emerald-500/50 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-rose-500/50 rounded-br-lg"></div>

                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{service.icon}</div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-100 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {service.desc}
                </p>
                
                <button className="inline-flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📈 3. Stats Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px),
                             linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-semibold tracking-wider uppercase">
                  {stat.label}
                </div>
                <div className="mt-2 text-lg">{stat.suffix}</div>
              </motion.div>
            ))}
          </div>

          {/* Animated Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="mt-20 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          />
        </div>
      </section>

      {/* 🎯 4. Process Section */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Work</span>
            </h2>
            
            <div className="space-y-12 mt-16">
              {[
                { step: '01', title: 'Discovery & Planning', desc: 'Understanding your vision and objectives' },
                { step: '02', title: 'Design & Prototyping', desc: 'Creating intuitive user experiences' },
                { step: '03', title: 'Development & Testing', desc: 'Building with cutting-edge technologies' },
                { step: '04', title: 'Launch & Support', desc: 'Deployment and ongoing optimization' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-8 p-8 rounded-3xl border border-gray-800 hover:border-cyan-500/30 hover:bg-gray-900/50 transition-all group"
                >
                  <div className="text-6xl font-black text-gray-800 group-hover:text-cyan-900 transition-colors">
                    {item.step}
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 📞 5. Call to Action */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-gray-950 to-purple-900/20"></div>
        
        {/* Animated Particles Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-gray-900/30 border border-gray-800 rounded-[4rem] p-16 shadow-2xl shadow-cyan-900/10"
          >
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-semibold mb-8">
              LET'S COLLABORATE
            </span>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Elevate</span><br />
              Your Digital Presence?
            </h2>
            
            <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of successful businesses who trusted us with their digital transformation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <Button className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-6 rounded-2xl text-lg font-bold shadow-2xl shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105">
                  <span className="relative z-10">Start Your Project</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </Link>
              
              <Link to="/projects">
                <Button className="group border-2 border-gray-700 hover:border-cyan-500 text-white px-12 py-6 rounded-2xl text-lg font-bold hover:bg-gray-900/50 transition-all">
                  <span className="flex items-center gap-3">
                    View Case Studies
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Button>
              </Link>
            </div>

            <p className="mt-12 text-gray-500 text-sm">
              Get response within 24 hours • Free consultation • No commitment
            </p>
          </motion.div>
        </div>
      </section>

  
    </div>
  );
};

export default Home;