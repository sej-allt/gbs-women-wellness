declare module '*.jsx' {
  import { ComponentType } from 'react';
  const Component: ComponentType<any>;
  export default Component;
}

// Explicit declarations for your components (optional)
declare module './components/LoginForm';
declare module './components/SignupForm';
declare module './components/Dashboard';
