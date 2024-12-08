// src/App.js
import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './pages/AuthContext'; // AuthContext import
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import Calendar from './pages/Calendar';
import TextSearch from './pages/TextSearch';
import Mypage from './pages/Mypage'; // 통합된 Mypage.js 파일

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 로그인 상태에 따라 페이지를 선택적으로 렌더링 */}
          <Route path="/" element={<LoginRedirect />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/search" element={<TextSearch />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// 로그인 상태를 체크하여 메인 페이지로 이동 또는 로그인 페이지로 이동
function LoginRedirect() {
  const { authToken } = useContext(AuthContext);  // 로그인 상태 체크
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (authToken === null) {
      setIsLoading(false); // 토큰이 없으면 로그인 페이지로
    } else {
      navigate('/main'); // 로그인 상태라면 /main으로 리디렉션
    }
  }, [authToken, navigate]);

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 보여줄 UI
  }

  return <Login />;  // 로그인되지 않은 경우 로그인 페이지 렌더링
}

export default App;
