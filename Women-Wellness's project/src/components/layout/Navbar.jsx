import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, User, Settings, LogOut, Home, BarChart2, Calendar as CalendarIcon } from 'lucide-react';

const Navbar = ({ 
  user, 
  userPreferences, 
  currentPage, 
  setCurrentPage, 
  notifications,
  onNotificationDismiss 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon }
  ];

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-primary text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <motion.h1 
              className="text-2xl font-bold cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavigation('dashboard')}
            >
              WellnessTracker
            </motion.h1>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center space-x-2 ${
                    currentPage === id ? 'text-tertiary' : 'hover:text-tertiary'
                  } transition-colors`}
                  onClick={() => handleNavigation(id)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="hover:text-tertiary transition-colors"
              >
                <Bell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-white text-gray-800 rounded-lg shadow-xl py-2"
                  >
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className="px-4 py-2 border-b border-gray-100 hover:bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm">{notification.title}</p>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <button
                              onClick={() => onNotificationDismiss(notification.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-600">
                        No new notifications
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
              >
                <img
                  src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user?.name || 'Guest'}</span>
              </motion.button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2"
                  >
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-red-600">
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    className={`flex items-center space-x-2 ${
                      currentPage === id ? 'text-tertiary' : 'hover:text-tertiary'
                    } transition-colors`}
                    onClick={() => handleNavigation(id)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
                <hr className="border-tertiary opacity-30" />
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user?.name || 'Guest'}</span>
                </div>
                <button className="flex items-center space-x-2 hover:text-tertiary transition-colors">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;