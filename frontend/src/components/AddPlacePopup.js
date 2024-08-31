import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";

const AddPlacePopup = ({ isOpen, onClose, onAddPlaceSubmit }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");

  const { handleSubmit } = useForm();

  const validateName = (e) => {
    const input = e.target;
    setName(input.value);

    if (!input.validity.valid) {
      if (input.validity.valueMissing) {
        setNameError("Este campo es requerido");
      } else if (input.validity.tooShort) {
        setNameError("El nombre debe tener al menos 2 caracteres");
      } else if (input.validity.tooLong) {
        setNameError("El nombre no debe tener más de 30 caracteres");
      }
    } else {
      setNameError("");
    }
  };

  const validateLink = (e) => {
    const input = e.target;
    setLink(input.value);

    if (!input.validity.valid) {
      if (input.validity.valueMissing) {
        setLinkError("Este campo es requerido");
      } else if (input.validity.typeMismatch) {
        setLinkError("El enlace debe ser válido");
      }
    } else {
      setLinkError("");
    }
  };

  const onSubmit = handleSubmit(() => {
    if (!nameError && !linkError) {
      onAddPlaceSubmit({ name, link });
      setName("");
      setLink("");
    }
  });

  return (
    <PopupWithForm
      name="place"
      titulo="Editar Lugar"
      form="form"
      button="Guardar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <div className="popup__grupo-input">
        <input
          className="popup__input"
          type="text"
          name="name-place"
          id="popup__input-name-place"
          placeholder="Title"
          value={name}
          onChange={validateName}
          required
          minLength={2}
          maxLength={30}
        />
        {nameError && (
          <span className="popup__input-error popup__error-visible">
            {nameError}
          </span>
        )}
      </div>

      <div className="popup__grupo-input">
        <input
          className="popup__input"
          type="url"
          name="url-place"
          id="popup__input-url-place"
          placeholder="Enlace a la imagen"
          value={link}
          onChange={validateLink}
          required
        />
        {linkError && (
          <span className="popup__input-error popup__error-visible">
            {linkError}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
