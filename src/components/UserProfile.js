import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const { token, logout } = useContext(AuthContext);
  const [newUsername, setNewUsername] = useState("");
  const navigate = useNavigate();

  const updateUserProfile = async () => {
    try {
      await axios.put(
        "/api/updateProfile",
        { username: newUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("회원 정보가 변경되었습니다.");
    } catch (error) {
      console.error("회원 정보 변경 실패:", error);
    }
  };

  const deleteUserAccount = async () => {
    const confirmed = window.confirm("정말로 회원 탈퇴를 하시겠습니까?");
    if (confirmed) {
      try {
        await axios.delete("/api/deleteAccount", {
          headers: { Authorization: `Bearer ${token}` },
        });
        logout();
        navigate("/login");
        alert("회원 탈퇴가 완료되었습니다.");
      } catch (error) {
        console.error("회원 탈퇴 실패:", error);
      }
    }
  };

  return (
    <div>
      <h2>회원 정보 변경</h2>
      <input
        type="text"
        placeholder="새로운 사용자 이름"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button onClick={updateUserProfile}>정보 변경</button>
      <button onClick={deleteUserAccount} style={{ backgroundColor: "red", color: "white" }}>
        회원 탈퇴
      </button>
    </div>
  );
};

export default UserProfile;
