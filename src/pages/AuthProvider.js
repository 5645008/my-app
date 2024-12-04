// src/contexts/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    // 앱 시작 시 localStorage에서 토큰을 가져와 상태를 설정
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // 로그인 함수
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  // 로그인 상태 확인 함수
  const isAuthenticated = () => {
    return authToken !== null;
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
