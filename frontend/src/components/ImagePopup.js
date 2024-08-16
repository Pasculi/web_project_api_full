import React from 'react';
import imageClose from '../images/vector__close.png';

const ImagenPopup = ({ onClose, card }) => {
    return (
    <>
      <div className={`popup popup-img-close-image  ${card ? 'popup--show' : ''}`}>
        <div className="popup__image-content">
          <button className="btn popup__image-button-close">
            <img className="popup__image-close" src={imageClose} alt="Cerrar Modal"
              id="img-close-image" onClick={onClose} />
          </button>
          <div className="popup__image-container-image">
            <figure className="popup__image-container">
              <img className="popup__image-url"
                src={card?.link}
                alt={card?.name} />
              <figcaption className="popup__image-name-place">{card?.name}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImagenPopup
