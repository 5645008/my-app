import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // 로그인 함수
  const login = (token) => {
    setAuthToken(token);
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);  // 로그인 후 user_id 설정
    localStorage.setItem('authToken', token); // 로그인 후 토큰을 localStorage에 저장
    localStorage.setItem('user_id', storedUserId); // user_id도 localStorage에 저장
  };

  // 로그아웃 함수
  const logout = () => {
    setAuthToken(null);
    setUserId(null); // 로그아웃 시 user_id도 null로 설정
    localStorage.removeItem('authToken'); // 로그아웃 시 localStorage에서 토큰 삭제
    localStorage.removeItem('user_id'); // user_id 삭제
  };

  // 페이지 로드 시 localStorage에서 authToken과 user_id를 읽어오는 useEffect
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('user_id');
    if (token && storedUserId) {
      setAuthToken(token); // token과 user_id가 존재하면 상태를 업데이트
      setUserId(storedUserId);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
