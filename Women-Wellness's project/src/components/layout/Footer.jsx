import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <motion.h3 
              className="text-xl font-bold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              WellnessTracker
            </motion.h3>
            <p className="text-tertiary mb-4">
              Empowering women to take control of their health and financial well-being.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, color: '#9BBEC8' }}
                  className="hover:text-tertiary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Our Services', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="text-tertiary hover:text-light transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Health Articles', 'Financial Tips', 'Community Forum', 'FAQ'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="text-tertiary hover:text-light transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {[
                { Icon: MapPin, text: '123 Wellness Street, Health City, HC 12345' },
                { Icon: Phone, text: '+1 (555) 123-4567' },
                { Icon: Mail, text: 'support@wellnesstracker.com' }
              ].map(({ Icon, text }, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center space-x-2"
                  whileHover={{ x: 5 }}
                >
                  <Icon className="w-5 h-5 text-tertiary" />
                  <span className="text-tertiary">{text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-tertiary/30 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-tertiary text-sm mb-4 md:mb-0">
              © {currentYear} WellnessTracker. All rights reserved.
            </p>
            <p className="text-tertiary text-sm flex items-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for women's wellness
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;