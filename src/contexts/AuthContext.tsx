import React, { createContext, useState, useEffect } from 'react';
import { localUserService } from '../services/localService';

type AuthContextType = {
  userRole: string | null;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = localUserService.get();
    // console.log("user", user);
    if (user && user.role) {
      setUserRole(user.role);
      // console.log("user.role", user.role);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
