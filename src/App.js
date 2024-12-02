// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import Calendar from './pages/Calendar';
import TextSearch from './pages/TextSearch';
import Mypage from "./pages/Mypage"; // 통합된 Mypage.js 파일

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/" element={<Login />} />
        {/* 회원가입 페이지 */}
        <Route path="/signup" element={<SignUp />} />
        {/* 메인 페이지 */}
        <Route path="/main" element={<Main />} />
        {/* 캘린더 페이지 */}
        <Route path="/calendar" element={<Calendar />} />
        {/* 텍스트 검색 페이지 */}
        <Route path="/search" element={<TextSearch />} />
        <Route path="/mypage" element={<Mypage />} /> 
        {/* 통합된 마이페이지 */}
      </Routes>
    </Router>
  );
}

export default App;