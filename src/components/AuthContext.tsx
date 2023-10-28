// AuthContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import axios from 'axios';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>; // Updated the return type to Promise<boolean>
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://erms.stefhol.eu/api/v1/login', { email, password });
      if (response.data) {
        setIsAuthenticated(true);
        console.log("User ID : " + response.data);
        setUserId(response.data);
        return true;
      } else {
        setIsAuthenticated(false);
        setUserId(null);
        return false;
      }
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false);
      setUserId(null);
      return false;
    }
  };

  // const login = async (email: string, password: string) => {
  //   // Here you'd usually send a request to your server for authentication
  //   // and set the state based on the response.
  //   setIsAuthenticated(true);
  // };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};