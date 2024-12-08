import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Mypage.styled.css"; // CSS 파일
import backArrow from "../assets/back_arrow.png"; // 뒤로가기 화살표 이미지

const Mypage = () => {
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    user_name: "",
    user_age: "",
    user_disease: "",
    user_gender: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(""); // 현재 비밀번호
  const [newPassword, setNewPassword] = useState(""); // 새로운 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const navigate = useNavigate();

  // 사용자 정보를 가져오는 API 요청
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          alert("로그인이 필요합니다.");
          navigate("/");
          return;
        }

        const response = await axios.get("https://moyak.store/api/get-userinfo", {
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
    };

    fetchUserInfo();
  }, [navigate]);

  // 사용자 정보를 업데이트하는 API 요청
  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("https://moyak.store/api/update-userinfo", {
        ...userInfo,
        currentPassword, // 현재 비밀번호 추가
        newPassword, // 새 비밀번호 추가
      });

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

  // 로그아웃 기능
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_token");
    alert("로그아웃되었습니다.");
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="mypage-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={backArrow} alt="Back" className="back-arrow-img" />
      </button>

      <h1>마이페이지</h1>

      {!isEditing ? (
        <div>
          <p>아이디: {userInfo.user_id}</p>
          <p>이름: {userInfo.user_name}</p>
          <p>나이: {userInfo.user_age}</p>
          <p>질병: {userInfo.user_disease}</p>
          <p>성별: {userInfo.user_gender}</p>
          <button onClick={() => setIsEditing(true)}>수정하기</button>
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

          {/* 비밀번호 변경 */}
          <label>
            현재 비밀번호:{" "}
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>
          <label>
            새 비밀번호:{" "}
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <label>
            새 비밀번호 확인:{" "}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          <div className="mypage-actions">
            <button onClick={handleSave}>저장하기</button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </div>
        </div>
      )}

      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Mypage;
