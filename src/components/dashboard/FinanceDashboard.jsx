import { motion } from 'framer-motion';
import { DollarSign, PiggyBank, TrendingUp, CreditCard } from 'lucide-react';

const FinanceDashboard = () => {
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
          <DollarSign className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Monthly Budget</h3>
        </div>
        <div className="text-3xl font-bold text-primary">$2,850</div>
        <div className="mt-2 text-sm text-gray-600">Remaining: $1,200</div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center mb-4">
          <PiggyBank className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Savings Goal</h3>
        </div>
        <div className="text-3xl font-bold text-primary">$15,000</div>
        <div className="mt-2 text-sm text-gray-600">Progress: 45%</div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center mb-4">
          <TrendingUp className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Investment Growth</h3>
        </div>
        <div className="text-3xl font-bold text-primary">+12.5%</div>
        <div className="mt-2 text-sm text-gray-600">This Month</div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-3"
      >
        <div className="flex items-center mb-4">
          <CreditCard className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Grocery Shopping</span>
            <span className="text-red-500">-$125.50</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Salary Deposit</span>
            <span className="text-green-500">+$3,200.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Utility Bill</span>
            <span className="text-red-500">-$85.20</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Investment Return</span>
            <span className="text-green-500">+$250.00</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FinanceDashboard;