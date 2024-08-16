import imageClose from "../images/vector__close.png";

const PopupWithForm = ({
  isOpen,
  name,
  titulo,
  form,
  button,
  children,
  onClose,
  onSubmit,
  isbuttonActive,
}) => {
  
  return (
    <>
      <div
        className={`popup popup-${name} popup-img-close-${name} ${
          isOpen ? "popup--show" : ""
        } `}
        id={`${name}`}
      >
        <div className={`popup__container-${form}`}>
          <button
            className={`btn popup__button-close popup__button-close-${name}`}
            onClick={onClose}
          >
            <img
              className="popup__image-close"
              src={imageClose}
              alt="Cerrar popup"
              id={`img-close-${name}`}
            />
          </button>
          <form
            action="#"
            name={`${name}`}
            className={`popup__${form} popup__form-${name} popup-${name}-from`}
            id={`form-popup-${name}`}
            onSubmit={onSubmit}
            noValidate
          >
            {name === "tooltip" ? (
              ""
            ) : (
              <h2 className="popup__title">{`${titulo}`}</h2>
            )}

            {children}

            {name === "tooltip" ? (
              <h2 className="popup__message">{ " " }</h2>
            ) : (
              <button
                className={`popup__button popup__button-${name}`}
                type="submit"
              >
                {button}
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
export default PopupWithForm;
