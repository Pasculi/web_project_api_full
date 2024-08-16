import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from 'react';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")

  useEffect(() => {
    setName(currentUser?.name );
    setDescription(currentUser?.about );
  }, [currentUser])

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name='profile'
      titulo='Editar Perfil'
      form='form' button='Guardar'
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}>
      
      <div
        className="popup__grupo-input">
        <input
          className="popup__input"
          type="text" name="name-user"
          id="popup__input-profile"
          minLength="2" maxLength="40"
          value={name || ''}
          onChange={handleNameChange} />
        <span className="popup__input-error popup__input-profile-error"></span>
      </div>

      <div className="popup__grupo-input">
        <input
          className="popup__input"
          type="text"
          name="job-user"
          id="popup__input-about"
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange} />
        <span className="popup__input-error popup__input-about-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup
