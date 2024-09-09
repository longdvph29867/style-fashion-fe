// src/contexts/AuthContext.ts
import { createContext, useContext, useState } from 'react';

// Định nghĩa các role có thể có
type UserRole = 'admin' | 'staff';

// Định nghĩa kiểu dữ liệu cho giá trị của AuthContext
interface AuthContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

// Tạo context với kiểu dữ liệu AuthContextType
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Định nghĩa kiểu dữ liệu cho AuthProvider props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Tạo AuthProvider để cung cấp context cho các component con
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userRole, setUserRole] = useState<UserRole>('staff'); // Giá trị mặc định là 'staff'

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
