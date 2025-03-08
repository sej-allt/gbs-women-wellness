import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Wallet } from 'lucide-react';

const Quiz = ({ onComplete }) => {
  const [focus, setFocus] = useState('');
  const [quizData, setQuizData] = useState({
    height: '',
    weight: '',
    medicalConditions: '',
    fitnessGoals: '',
    expenseLimit: '',
    spendingHabits: '',
    savingsGoals: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({ focus, ...quizData });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Personalize Your Experience</h2>

      {!focus ? (
        <div className="grid grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setFocus('health')}
            className="p-6 border-2 border-tertiary rounded-lg hover:border-primary transition-colors"
          >
            <Activity className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold">Health Focus</h3>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setFocus('finance')}
            className="p-6 border-2 border-tertiary rounded-lg hover:border-primary transition-colors"
          >
            <Wallet className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold">Finance Focus</h3>
          </motion.button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {focus === 'health' ? (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Height</label>
                <input
                  type="text"
                  value={quizData.height}
                  onChange={(e) => setQuizData({ ...quizData, height: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Weight</label>
                <input
                  type="text"
                  value={quizData.weight}
                  onChange={(e) => setQuizData({ ...quizData, weight: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Medical Conditions</label>
                <textarea
                  value={quizData.medicalConditions}
                  onChange={(e) => setQuizData({ ...quizData, medicalConditions: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="3"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Fitness Goals</label>
                <textarea
                  value={quizData.fitnessGoals}
                  onChange={(e) => setQuizData({ ...quizData, fitnessGoals: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Monthly Expense Limit</label>
                <input
                  type="number"
                  value={quizData.expenseLimit}
                  onChange={(e) => setQuizData({ ...quizData, expenseLimit: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Daily Spending Habits</label>
                <textarea
                  value={quizData.spendingHabits}
                  onChange={(e) => setQuizData({ ...quizData, spendingHabits: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Savings Goals</label>
                <textarea
                  value={quizData.savingsGoals}
                  onChange={(e) => setQuizData({ ...quizData, savingsGoals: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setFocus('')}
              className="px-6 py-2 text-primary hover:text-secondary transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
            >
              Complete
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default Quiz;