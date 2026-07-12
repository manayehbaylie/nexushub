import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('nexushub_session') || 'null');
      return stored?.user || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('nexushub_session') || 'null');
    if (!session?.user) {
      localStorage.removeItem('nexushub_user');
      return;
    }
    localStorage.setItem('nexushub_user', JSON.stringify(session.user));
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
