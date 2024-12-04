// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token); // 로그인 후 토큰을 localStorage에 저장
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); // 로그아웃 시 localStorage에서 토큰 삭제
  };

  useEffect(() => {
    // 인증된 사용자가 있을 때 자동 로그인 처리
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
