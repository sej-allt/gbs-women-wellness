import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const PhoneAuth = ({ onComplete }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1 && phoneNumber.length >= 10) {
      setStep(2);
    } else if (step === 2 && name.trim()) {
      onComplete({ phoneNumber, name });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="text-center mb-8">
        <div className="bg-primary rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
          <Phone className="text-light w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-primary">Welcome to WellnessTracker</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your phone number"
              required
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors"
        >
          {step === 1 ? 'Continue' : 'Get Started'}
        </button>
      </form>
    </motion.div>
  );
};

export default PhoneAuth;