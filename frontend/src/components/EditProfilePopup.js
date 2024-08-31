import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Estados para almacenar mensajes de error
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // Estados para la validez de los inputs
  const [isNameValid, setIsNameValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser]);

  const handleNameChange = (event) => {
    const { value, validity } = event.target;
    setName(value);

    // Validación de nombre
    if (!validity.valid) {
      setNameError(event.target.validationMessage);
      setIsNameValid(false);
    } else {
      setNameError("");
      setIsNameValid(true);
    }
  };

  const handleDescriptionChange = (event) => {
    const { value, validity } = event.target;
    setDescription(value);

    // Validación de descripción
    if (!validity.valid) {
      setDescriptionError(event.target.validationMessage);
      setIsDescriptionValid(false);
    } else {
      setDescriptionError("");
      setIsDescriptionValid(true);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isNameValid && isDescriptionValid) {
      onUpdateUser({
        name,
        about: description,
      });
    }
  };

  return (
    <PopupWithForm
      name="profile"
      titulo="Editar Perfil"
      form="form"
      button="Guardar"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__grupo-input">
        <input
          className="popup__input"
          type="text"
          name="name-user"
          id="popup__input-profile"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleNameChange}
          required
        />
        <span
          className={`popup__input-error ${
            !isNameValid ? "popup__error-visible" : ""
          }`}
        >
          {nameError}
        </span>
      </div>

      <div className="popup__grupo-input">
        <input
          className="popup__input"
          type="text"
          name="job-user"
          id="popup__input-about"
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleDescriptionChange}
          required
        />
        <span
          className={`popup__input-error ${
            !isDescriptionValid ? "popup__error-visible" : ""
          }`}
        >
          {descriptionError}
        </span>
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
