import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'jstar-user';

// Mock user database for demonstration
const MOCK_USERS = [
  { email: 'quocanh@gmail.com', password: '123456', name: 'Test User' },
  { email: 'admin@jstar.com', password: 'admin123', name: 'Admin User' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find matching user
    const foundUser = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const userData: User = { email: foundUser.email, name: foundUser.name };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return { success: true };
    }

    // Check if email exists but password is wrong
    const emailExists = MOCK_USERS.some(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    return { success: false, error: 'No account found with this email address.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find current user in mock database
    const currentUser = MOCK_USERS.find(
      u => u.email.toLowerCase() === user?.email.toLowerCase()
    );

    if (!currentUser) {
      return { success: false, error: 'User not found.' };
    }

    // Verify current password
    if (currentPassword !== currentUser.password) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    // Validate new password
    if (newPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' };
    }

    // Update password in mock database (in memory only)
    currentUser.password = newPassword;

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn: !!user, 
      login, 
      logout,
      changePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

