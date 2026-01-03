import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* 🚀 Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-white to-gray-50">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <motion.span variants={fadeIn} className="text-blue-600 font-bold tracking-widest uppercase text-sm">
            Future of Technology
          </motion.span>
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold text-slate-900 mt-4 leading-tight">
            Building Digital Experiences <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              With Infina Tech
            </span>
          </motion.h1>
          <motion.p variants={fadeIn} className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
            We provide world-class web solutions, custom software, and digital marketing services to help your business grow.
          </motion.p>
          
          <motion.div variants={fadeIn} className="mt-10 flex gap-4 justify-center">
            <Link to="/projects">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-3">
                View Our Work
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 🛠️ Services Short Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Core Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Web Development', 'App Design', 'Cloud Solutions'].map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-blue-600 font-bold">{index + 1}</span>
                </div>
                <h3 className="font-bold text-xl mb-2">{service}</h3>
                <p className="text-gray-500 text-sm">High-quality and scalable solutions tailored for your needs.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📈 Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><h4 className="text-4xl font-bold">100+</h4><p className="text-gray-400">Projects</p></div>
          <div><h4 className="text-4xl font-bold">50+</h4><p className="text-gray-400">Clients</p></div>
          <div><h4 className="text-4xl font-bold">5+</h4><p className="text-gray-400">Years Exp.</p></div>
          <div><h4 className="text-4xl font-bold">24/7</h4><p className="text-gray-400">Support</p></div>
        </div>
      </section>

      {/* 📞 Call to Action */}
      <section className="py-20 text-center bg-blue-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Have a project in mind?</h2>
        <p className="mb-8 opacity-90">Let's build something great together.</p>
        <Link to="/contact">
          <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold">
            Contact Us Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;