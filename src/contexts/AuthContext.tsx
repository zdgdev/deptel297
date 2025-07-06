import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  userProfile: {
    name: string;
    rank: string;
    clearanceLevel: string;
    agentId: string;
  } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<AuthContextType['userProfile']>(null);

  const login = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, accept any credentials
    if (credentials.username && credentials.password) {
      setIsAuthenticated(true);
      setUserProfile({
        name: 'Agent ' + credentials.username.toUpperCase(),
        rank: 'Senior Intelligence Officer',
        clearanceLevel: 'TOP SECRET',
        agentId: 'CIA-' + Math.random().toString(36).substring(2, 8).toUpperCase()
      });
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      login,
      logout,
      userProfile
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