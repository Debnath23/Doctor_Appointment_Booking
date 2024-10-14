import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setToken(accessToken);
    }
  }, [token]);

  const login = (accessToken) => {
    Cookies.set('accessToken', accessToken, { expires: import.meta.ACCESS_TOKEN_EXPIRY });
    setToken(accessToken);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
