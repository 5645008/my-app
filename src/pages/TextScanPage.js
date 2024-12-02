// TextScanPage.js
import React  from 'react';
import Camera  from '../pages/TextScan/Camera';
import TextScanner  from '../pages/TextScan/TextScanner';
import ImagePreview  from '../pages/TextScan/ImagePreview';
import useCamera  from '../pages/TextScan/useCamera';



function TextScanPage() {
  const { image, captureImage } = useCamera();
  console.log({ image, captureImage });

  return (
    <div className="TextScanPage">
      <h1>Text Scanner App</h1>
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