export default class FormValidator {
  constructor(formSelectors, formElement) {
    this._form = '.popup__form';
    this._input = '.popup__input';
    this._submitSelector = ".popup__button";
    this._inactiveSubmit = "popup__button-disabled";
    this._inputErrorClass = "popup__input-type-error";
    this._errorClass = "popup__input-type-error";

    this._inputList = Array.from(formElement.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitSelector);
  }

  enableValidation() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  resetValidation = () => {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveSubmit);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(this._inactiveSubmit);
      buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(
      `.${inputElement.id}-error`,
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(
      `.${inputElement.id}-error`,
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
}