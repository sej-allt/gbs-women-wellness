import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&h=200"
            alt="Logo"
            className="w-24 h-24 mx-auto rounded-full shadow-lg"
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-light mb-4"
        >
          WellnessTracker
        </motion.h1>
        
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-light rounded-full loading-dot"></div>
          <div className="w-3 h-3 bg-light rounded-full loading-dot"></div>
          <div className="w-3 h-3 bg-light rounded-full loading-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;