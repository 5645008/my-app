import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // 토큰을 저장하는 함수
  const saveToken = (receivedToken) => {
    localStorage.setItem("token", receivedToken); // localStorage에 토큰 저장
    setToken(receivedToken);
  };

  // 로그아웃 시 토큰을 제거하는 함수
  const logout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    setToken(null);
  };

  // 페이지 새로고침 시 토큰을 확인하여 유지
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
