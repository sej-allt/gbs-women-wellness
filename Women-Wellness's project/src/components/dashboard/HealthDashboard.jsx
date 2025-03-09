import { motion } from 'framer-motion';
import { Activity, Moon, Droplets, Pill as Pills, Calendar } from 'lucide-react';

const HealthDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center mb-4">
          <Activity className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Daily Steps</h3>
        </div>
        <div className="text-3xl font-bold text-primary">8,432</div>
        <div className="mt-2 text-sm text-gray-600">Goal: 10,000 steps</div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center mb-4">
          <Moon className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Sleep Tracking</h3>
        </div>
        <div className="text-3xl font-bold text-primary">7h 30m</div>
        <div className="mt-2 text-sm text-gray-600">Goal: 8 hours</div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center mb-4">
          <Droplets className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Water Intake</h3>
        </div>
        <div className="text-3xl font-bold text-primary">1.5L</div>
        <div className="mt-2 text-sm text-gray-600">Goal: 2.5L</div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center mb-4">
          <Pills className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Medicine Reminders</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Vitamin D</span>
            <span className="text-sm text-gray-600">8:00 AM</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Iron Supplement</span>
            <span className="text-sm text-gray-600">2:00 PM</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-2"
      >
        <div className="flex items-center mb-4">
          <Calendar className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Upcoming Health Events</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Annual Check-up</span>
            <span className="text-sm text-gray-600">March 15, 2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Dental Cleaning</span>
            <span className="text-sm text-gray-600">April 2, 2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Eye Examination</span>
            <span className="text-sm text-gray-600">April 15, 2024</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HealthDashboard;