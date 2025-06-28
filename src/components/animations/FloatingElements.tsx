import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Leaf, Zap } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const elements = [
    { Icon: Sun, delay: 0, x: '10vw', y: '20vh' },
    { Icon: Leaf, delay: 1, x: '80vw', y: '60vh' },
    { Icon: Zap, delay: 2, x: '20vw', y: '80vh' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-solar-yellow/20"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <Icon size={32} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;