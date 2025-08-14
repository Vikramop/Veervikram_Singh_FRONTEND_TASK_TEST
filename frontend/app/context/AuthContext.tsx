'use client';

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

type AuthContextType = {
  user: string | null; // username or null
  token: string | null; // auth token
  loading: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load saved token & user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');

    if (savedToken) {
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  // Login: save user + token
  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('authToken', token);
  };

  // Logout: clear everything
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('phone');
    window.location.href = '/login'; // <-- immediate redirect
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
