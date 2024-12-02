import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Main.styled.css';
import camera from '../assets/camera.png';
import calendar from '../assets/calendar_image.png';
import glass from '../assets/reading_glasses.png';

function Main() {
  const [today, setToday] = useState('');
  const [todayMedications, setTodayMedications] = useState([]);
  const [userName, setUserName] = useState('');

  // 현재 날짜를 가져와서 YYYY-MM-DD 형식으로 설정
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setToday(formattedDate);

    // 로컬 스토리지에서 알림 목록 가져오기
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const todayReminders = savedReminders.filter((reminder) => {
      const reminderDate = reminder.reminder_date
        ? new Date(reminder.reminder_date).toDateString()
        : null;
      const isToday =
        reminderDate && reminderDate === currentDate.toDateString(); // 날짜가 오늘인지 확인
      const isRepeatDay =
        reminder.days_of_week &&
        reminder.days_of_week.split(',').includes(String(currentDate.getDay())); // 요일 반복 확인

      return isToday || isRepeatDay;
    });

    // 오늘의 약 목록 설정
    setTodayMedications(todayReminders.map((reminder) => reminder.medication));

    // 로그인한 사용자 이름 가져오기
    const fetchUserName = async () => {
      try {
        const user_id = localStorage.getItem('user_id'); // 로그인 시 저장된 user_id 가져옴

        if (user_id) {
          const response = await axios.get('https://moyak.store/api/get-username', {
            params: { user_id },
          });

          if (response.data.success) {
            setUserName(response.data.user_name); // 이름을 상태에 저장
          } else {
            alert('사용자 이름을 찾을 수 없습니다.');
          }
        }
      } catch (error) {
        console.error('이름 불러오기 오류:', error);
        alert('이름을 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchUserName(); // 이름을 가져오는 함수 호출
  }, []);

  return (
    <div className="main">
      {/* 상단 사용자 정보 및 날짜 */}
      <div className="header">
        <span>{userName ? `${userName}님` : '사용자님'}</span>
        <span>{today}</span> {/* 오늘 날짜를 표시 */}
        {/* 캘린더 아이콘을 클릭하면 캘린더 페이지로 이동 */}
        <Link to="/calendar">
          <button className="calendar-button">
            <img src={calendar} alt="Calendar" className="calendar-icon" />
          </button>
        </Link>
      </div>

      {/* 오늘의 약 정보 */}
      <div className="medication-card">
        <h2>오늘</h2>
        <div className="medication-list">
          {todayMedications.length > 0 ? (
            todayMedications.map((medication, index) => <p key={index}>{medication}</p>)
          ) : (
            <p>오늘 복용할 약이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 검색 버튼 섹션 */}
      <div className="button-section">
        {/* 약 검색 버튼 */}
        <Link to="/search">
          <button className="search-button">
            <img src={glass} alt="Search" className="button-icon" width={'50px'}/>
            <span>약 검색</span> {/* 아이콘 아래 텍스트 출력 */}
          </button>
        </Link>

        {/* 사진 검색 버튼 */}
        <Link to="/text-scan">
          <button className="camera-button">
            <img src={camera} alt="Camera" className="button-icon" width={'50px'}/>
            <span>사진 검색</span> {/* 아이콘 아래 텍스트 출력 */}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Main;