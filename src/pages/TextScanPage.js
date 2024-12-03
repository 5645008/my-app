// TextScanPage.js
import React  from 'react';
<<<<<<< HEAD
import Camera  from '../pages/TextScan/Camera';
import TextScanner  from '../pages/TextScan/TextScanner';
import ImagePreview  from '../pages/TextScan/ImagePreview';
import useCamera  from '../pages/TextScan/useCamera';
import '../css/ScanResult.styled.css';
=======
import { Link } from 'react-router-dom';
import Camera  from './TextScan/Camera';
import TextScanner  from './TextScan/TextScanner';
import ImagePreview  from './TextScan/ImagePreview';
import useCamera  from './TextScan/useCamera';
import back from '../assets/back_arrow.png';
>>>>>>> 599e280ac9f4b7ea927a507ea6d5ba4cfb3af3b1



function TextScanPage() {
  const { image, captureImage } = useCamera();
  console.log({ image, captureImage });

  return (
    <div className="TextScanPage">
      <Link to="/main"><img src={back} width="20px" alt="back" /></Link>
      <h1>Text Scanner</h1>
      <Camera onCapture={captureImage} />
      {image && (
        <>
          <ImagePreview image={image} />
          <TextScanner image={image} />
        </>
      )}
    </div>
  );
}

export default TextScanPage;