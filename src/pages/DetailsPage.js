import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/DetailsPage.styled.css';
import back from '../assets/back_arrow.png';

const DetailsPage = () => {
  const [details, setDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { medicineName } = location.state || {}; // 약 이름 추출

  useEffect(() => {
    if (medicineName) {
      fetchMedicineDetails(medicineName);
      checkMedicationSafety(medicineName);
    }
  }, [medicineName]);

  // 약품 상세 정보를 가져오는 함수
  const fetchMedicineDetails = async (name) => {
    try {
      const response = await axios.get('https://moyak.store/api/medicine/details', {
        params: { name },
      });
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching medicine details:', error);
    }
  };

  // 약물 안전성을 확인하는 함수
  const checkMedicationSafety = async (name) => {
    try {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        console.error('로그인 정보가 없습니다.');
        return;
      }

      const response = await axios.get('https://moyak.store/api/check-medication-safety', {
        params: { user_id, medicine_name: name },
      });

      if (!response.data.safe) {
        setDetails((prev) => ({
          ...prev,
          warning: response.data.message,
        }));
      }
    } catch (error) {
      console.error('안전성 확인 중 오류:', error);
    }
  };

  if (!medicineName) {
    return <p className="loading-message">약 이름이 전달되지 않았습니다.</p>;
  }

  return (
    <div className="details-page">
      <div className="details-header">
        {/* 뒤로 가기 버튼 */}
        <button className="back-button" onClick={() => navigate('/main')}>
          <img src={back} alt="back" width={'20px'}/>
        </button>
        <h1 className="details-title">{medicineName} 상세 정보</h1>
      </div>

      {details ? (
        <div className="details-container">
          <p className="details-item"><strong>제조사:</strong> {details.entpName}</p>
          <p className="details-item"><strong>효능:</strong> {details.efcyQesitm}</p>
          <p className="details-item"><strong>사용 방법:</strong> {details.useMethodQesitm}</p>
          <p className="details-item"><strong>주의 경고:</strong> {details.atpnWarnQesitm}</p>
          <p className="details-item"><strong>주의 사항:</strong> {details.atpnQesitm}</p>
          <p className="details-item"><strong>상호작용:</strong> {details.intrcQesitm}</p>
          <p className="details-item"><strong>부작용:</strong> {details.seQesitm}</p>
          <p className="details-item"><strong>보관 방법:</strong> {details.depositMethodQesitm}</p>
          <p className="details-item"><strong>성분:</strong> {details.ingredientName}</p>

          {/* 경고 메시지 */}
          {details.warning && (
            <div className="warning-message">
              <p>{details.warning}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="loading-message">로딩 중...</p>
      )}
    </div>
  );
};

export default DetailsPage;