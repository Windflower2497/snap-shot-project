import React from "react";

const Image = ({ imageRef, url, alt, onImageClick }) => (
  <li>
    <img className= "image-card" onClick={onImageClick} ref={imageRef} src={url} alt={alt} />
    <div className="image-title">{alt == '' ? 'No title' : alt.toUpperCase() }</div>
  </li>
);

export default Image;
