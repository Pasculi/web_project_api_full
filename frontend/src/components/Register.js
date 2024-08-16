import { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Register({ handleSubmit, confirmation = "Regístrate" }){
  const [buttonContent, setButtonContent] = useState(confirmation);
  const formRef = useRef();

  const getInputValues = () => {
    const inputValues = {};
    const inputList = Array.from(formRef.current.querySelectorAll("input"));
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  };

  const handlePrepareSubmit = (evt) => {
    evt.preventDefault();
    setButtonContent("Ingresando...");
    handleSubmit(getInputValues()).finally(() => {
      setButtonContent(confirmation);
    });
  };

  return (
    <div className="login">
      <h1 className="login__title">Regístrate</h1>
      <form
        className="login__form"
        noValidate
        onSubmit={handlePrepareSubmit}
        ref={formRef}
      >
        <div className="login__form-container">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="login__input"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="login__input"
          />
        </div>
        <button type="submit" className="login__submit">
          {buttonContent}
        </button>
        <p className="login__register">
          ¿Ya eres miembro? <Link to="/signin">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
};


