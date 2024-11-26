// components/Camera.js
import React from 'react';
import Webcam from 'react-webcam';
import './Camera.css';

const Camera = ({ onCapture }) => {
  const webcamRef = React.useRef(null);
  const [isCapturing, setIsCapturing] = React.useState(false); // Trang thai chup anh

  const captureImage = () => {
    setIsCapturing(true); // Bat dau qua trinh chup
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
    setTimeout(() => setIsCapturing(false), 2000); //Dat trang thai tro ve binh thuong sau 1s
  };

  return (
    <div className='camera-container'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className='camera-video'
      />
      <button onClick={captureImage}
       className='capture-button'
       disabled={isCapturing} // Vo hieu hoa khi dang chup anh
       >
        {isCapturing ?  'Capturing...' : 'Capture Image'} {/* Hien thi thong bao*/} 
        </button>
    </div>
    
  );
};

export default Camera;
