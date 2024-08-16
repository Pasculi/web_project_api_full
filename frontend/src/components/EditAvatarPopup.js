import React, { useRef } from 'react'
import PopupWithForm from './PopupWithForm'

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar}) => {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name='avatar-edit'
      titulo='Cambiar foto de perfil'
      form='form-avatar'
      button='Guardar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__grupo-input">
        <input
          ref={avatarRef}
          className="popup__input"
          type="url"
          name="url-avatar"
          id="popup__input-url-avatar"
          placeholder="Avatar"
          required />
        <span className="popup__input-error popup__input-url-avatar-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
