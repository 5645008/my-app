// components/ImagePreview.js
import React from 'react';

const ImagePreview = ({ image }) => {
  console.log(image); 

  return (
    <div className="image-preview">
      <img src={image} alt="Captured" className="preview-image" />
      <p>No image captured yet</p> 
    </div>
  );
};

export default ImagePreview;
