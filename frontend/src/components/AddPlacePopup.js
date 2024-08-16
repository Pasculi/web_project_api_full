import React, { useState } from 'react'
import PopupWithForm from './PopupWithForm'
import { useForm } from 'react-hook-form';

const AddPlacePopup = ({ isOpen, onClose, onAddPlaceSubmit }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const { register, handleSubmit, formState: {
    errors,
  } } = useForm();

  const onSubmit = handleSubmit((data) => {
    onAddPlaceSubmit({ name, link });
    setName("");
    setLink("");
    
  })


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
          {...register("namePlace", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres",
            },
            maxLength: {
              value: 30,
              message: "El nombre no debe tener más de 30 caracteres",
            },
          })}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.namePlace && (
          <span className="popup__input-error popup__input-name-place-error">
            El nombre del lugar es requerido
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
          {...register("urlPlace", {
            required: {
              value: true,
              message: "Este campo es requerido",
              pattern: {
                value:   /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
      message: "El enlace debe ser válido",

              }
            },
          })}
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {errors.urlPlace && (
          <span className="popup__input-error popup__input-url-place-error">
            El nombre del lugar es requerido
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup
