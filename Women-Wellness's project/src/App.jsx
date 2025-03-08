import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import PhoneAuth from './components/auth/PhoneAuth';
import Quiz from './components/onboarding/Quiz';
import HealthDashboard from './components/dashboard/HealthDashboard';
import FinanceDashboard from './components/dashboard/FinanceDashboard';
import AnalyticsPage from './components/analytics/AnalyticsPage';
import CalendarPage from './components/calendar/CalendarPage';
import Chatbot from './components/dashboard/Chatbot';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New health tip available!', time: '2 minutes ago' },
    { id: 2, title: 'Reminder: Track your water intake', time: '1 hour ago' },
    { id: 3, title: 'Weekly progress report ready', time: '3 hours ago' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAuthComplete = (userData) => {
    setUser(userData);
  };

  const handleQuizComplete = (preferences) => {
    setUserPreferences(preferences);
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <PhoneAuth onComplete={handleAuthComplete} />;
  }

  if (!userPreferences) {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return userPreferences.focus === 'health' ? (
          <HealthDashboard />
        ) : (
          <FinanceDashboard />
        );
      case 'analytics':
        return <AnalyticsPage userPreferences={userPreferences} />;
      case 'calendar':
        return <CalendarPage userPreferences={userPreferences} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <Navbar 
        user={user} 
        userPreferences={userPreferences}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        notifications={notifications}
        onNotificationDismiss={handleNotificationDismiss}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-primary mb-8">
            Welcome back, {user.name}!
          </h2>
          
          {renderPage()}
        </motion.div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;