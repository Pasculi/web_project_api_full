
import React from 'react'
import successImage from "../images/success.png";
import errorImage from "../images/wrong.png";
import PopupWithForm from './PopupWithForm';

const InfoTooltip = ({ isOpen, name, onClose, isSuccess }) => {

  const message =
    isSuccess === "success"
      ? "¡Correcto! Ya estás registrado."
      : "Uy, algo salió mal. Por favor, inténtalo de nuevo.";

  const iconMessage = isSuccess === "success" ? successImage : errorImage;
  return (
    <PopupWithForm name={name} form="form" isOpen={isOpen} onClose={onClose}>
      <div className={`popup__image-${name}`}>
        <img src={iconMessage} alt={isSuccess} />
        <h2 className="popup__message">{`${message}`}</h2>
      </div>
    </PopupWithForm>
  );
};

export default InfoTooltip
