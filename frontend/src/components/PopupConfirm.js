import React from 'react'
import PopupWithForm from './PopupWithForm'

const PopupConfirm = ({ title, onSubmit }) => {
  return (
    <PopupWithForm onSubmit={onSubmit}>
      <h2>{title}</h2>
    </PopupWithForm>
  );
};

export default PopupConfirm
