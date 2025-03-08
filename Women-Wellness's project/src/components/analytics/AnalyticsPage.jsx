import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, Heart, Brain } from 'lucide-react';

const healthData = [
  { name: 'Mon', steps: 8432, sleep: 7.5, water: 2.1, stress: 3 },
  { name: 'Tue', steps: 10123, sleep: 6.8, water: 2.5, stress: 4 },
  { name: 'Wed', steps: 7891, sleep: 8.2, water: 1.8, stress: 2 },
  { name: 'Thu', steps: 9432, sleep: 7.1, water: 2.3, stress: 5 },
  { name: 'Fri', steps: 11234, sleep: 7.8, water: 2.7, stress: 3 },
  { name: 'Sat', steps: 6789, sleep: 8.5, water: 1.9, stress: 2 },
  { name: 'Sun', steps: 9876, sleep: 7.9, water: 2.4, stress: 1 },
];

const financeData = [
  { name: 'Jan', savings: 1200, expenses: 800, investments: 400 },
  { name: 'Feb', savings: 1500, expenses: 750, investments: 600 },
  { name: 'Mar', savings: 1300, expenses: 900, investments: 500 },
  { name: 'Apr', savings: 1800, expenses: 700, investments: 800 },
  { name: 'May', savings: 2000, expenses: 850, investments: 900 },
  { name: 'Jun', savings: 1700, expenses: 950, investments: 700 },
];

const expenseBreakdown = [
  { name: 'Healthcare', value: 400 },
  { name: 'Groceries', value: 300 },
  { name: 'Fitness', value: 200 },
  { name: 'Self-care', value: 150 },
];

const COLORS = ['#164863', '#427D9D', '#9BBEC8', '#DDF2FD'];

const AnalyticsPage = ({ userPreferences }) => {
  const isHealth = userPreferences?.focus === 'health';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isHealth ? (
          <>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-lg font-semibold">Average Steps</h3>
              </div>
              <div className="text-3xl font-bold text-primary">9,111</div>
              <div className="text-sm text-gray-600">+12% from last week</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-lg font-semibold">Sleep Quality</h3>
              </div>
              <div className="text-3xl font-bold text-primary">7.7hrs</div>
              <div className="text-sm text-gray-600">Good quality sleep</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-lg font-semibold">Stress Level</h3>
              </div>
              <div className="text-3xl font-bold text-primary">Low</div>
              <div className="text-sm text-gray-600">-25% from last week</div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-lg font-semibold">Total Savings</h3>
              </div>
              <div className="text-3xl font-bold text-primary">$9,500</div>
              <div className="text-sm text-gray-600">+15% this month</div>
            </motion.div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isHealth ? (
          <>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Weekly Activity Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="steps" stroke="#164863" name="Steps" />
                  <Line type="monotone" dataKey="sleep" stroke="#427D9D" name="Sleep (hrs)" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Stress & Hydration Correlation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="water" fill="#9BBEC8" stroke="#164863" name="Water (L)" />
                  <Area type="monotone" dataKey="stress" fill="#DDF2FD" stroke="#427D9D" name="Stress Level" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="savings" fill="#164863" name="Savings" />
                  <Bar dataKey="expenses" fill="#427D9D" name="Expenses" />
                  <Bar dataKey="investments" fill="#9BBEC8" name="Investments" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Expense Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;