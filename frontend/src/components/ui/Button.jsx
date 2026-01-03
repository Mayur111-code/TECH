import { motion } from 'framer-motion';

const Button = ({ children, onClick, className, type = "button" }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type={type}
    onClick={onClick}
    className={`px-6 py-2 rounded-lg font-medium transition-all shadow-md active:shadow-inner ${className}`}
  >
    {children}
  </motion.button>
);

export default Button;