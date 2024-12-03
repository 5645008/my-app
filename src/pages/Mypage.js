// src/pages/Mypage.js
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/Mypage.styled.css';  // CSS 파일을 임포트

const Mypage = () => {
  const { logout } = useContext(AuthContext); // AuthProvider에서 가져온 logout 함수
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    user_name: "",
    user_age: "",
    user_disease: "",
    user_gender: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem("user_id");
      if (userId) {
        try {
          const response = await axios.get("https://localhost:3000/api/get-userinfo", {
            params: { user_id: userId },
          });
          if (response.data.success) {
            setUserInfo(response.data.userInfo);
          } else {
            alert("사용자 정보를 불러오지 못했습니다.");
          }
        } catch (error) {
          console.error("사용자 정보 요청 오류:", error);
          alert("사용자 정보를 가져오는 중 오류가 발생했습니다.");
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    try {
      const response = await axios.post("http://52.78.154.108:3000/api/update-userinfo", userInfo);
      if (response.data.success) {
        alert("사용자 정보가 성공적으로 업데이트되었습니다.");
        setIsEditing(false);
      } else {
        alert("사용자 정보를 업데이트하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("사용자 정보 업데이트 오류:", error);
      alert("업데이트 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mypage-container">
      <h1>마이페이지</h1>

      {!isEditing ? (
        <div>
          <p>아이디: {userInfo.user_id}</p>
          <p>이름: {userInfo.user_name}</p>
          <p>나이: {userInfo.user_age}</p>
          <p>질병: {userInfo.user_disease}</p>
          <p>성별: {userInfo.user_gender}</p>
          <button onClick={handleEdit}>수정하기</button>
        </div>
      ) : (
        <div>
          <label>
            이름:{" "}
            <input
              type="text"
              value={userInfo.user_name}
              onChange={(e) => setUserInfo({ ...userInfo, user_name: e.target.value })}
            />
          </label>
          <label>
            나이:{" "}
            <input
              type="number"
              value={userInfo.user_age}
              onChange={(e) => setUserInfo({ ...userInfo, user_age: e.target.value })}
            />
          </label>
          <label>
            질병:{" "}
            <input
              type="text"
              value={userInfo.user_disease}
              onChange={(e) => setUserInfo({ ...userInfo, user_disease: e.target.value })}
            />
          </label>
          <label>
            성별:{" "}
            <select
              value={userInfo.user_gender}
              onChange={(e) => setUserInfo({ ...userInfo, user_gender: e.target.value })}
            >
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
          </label>
          <div className="mypage-actions">
            <button onClick={handleSave}>저장하기</button>
            <button onClick={handleCancel}>취소</button>
          </div>
        </div>
      )}

      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Mypage;
