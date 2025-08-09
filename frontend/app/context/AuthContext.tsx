'use client';

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

type AuthContextType = {
  user: string | null;
  loading: boolean;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading & check saved user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('osaa_user');
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem('osaa_user', username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('osaa_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
