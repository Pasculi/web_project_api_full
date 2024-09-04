import "../index.css";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api.js";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login.js";
import Register from "./Register";
import { Route, Routes, useNavigate} from "react-router-dom";
import InfoTooltip from "./InfoTooltip.js";
import NotPage from "./NotPage.js";

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState();
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [messageTooltip, setMessageTooltip] = useState('');
  const [tooltipType, setTooltipType] = useState("success");
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [isbuttonActive, setIsbuttonActive] = useState(false);
  const navigate = useNavigate();


  function handleCardDelete(card) {
    return api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id!== card._id));
      setCardToDelete(null);
    })

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (cardToDelete) {
      handleCardDelete(cardToDelete);
    }
    closeAllPopups();
  };
 
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api.likeCard(card._id, isLiked)
      .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }


  const handleUpdateUser = ({ name, about }) => {
    api
      .updateUser({ name, about })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setOpenTooltip(false);
    setIsOpenConfirmation(false);
  };
 

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  
  const handleAddPlaceSubmit = ({ name, link }) => {
    api.addCard({ name, link }).then((newCard) => {
      setCards([newCard, ...cards]);
      setIsAddPlacePopupOpen(false);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.setToken(token)
      getUserInfo(token)
      setCurrentPage('/signin')
    } else {
      navigate("/signin");
    }
  }, []);



  const handleLogin = async ({ email, password }) => {
    try {
      const { token, message } = await auth.login({ email, password });
      if (token) {
        api.setToken(token);
        localStorage.setItem("token", token);
        getUserInfo(token);
      } else {
        setMessageTooltip(message);
        setTooltipType("error");
        setOpenTooltip(true);
        setCurrentEmail(email);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/signin");
  };

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar(avatar);
    setCurrentUser({ ...currentUser, avatar: avatar });
    closeAllPopups();
  }

  

  const handleRegister = async ({ email, password }) => {
    try {
      const { error } = await auth.register({email, password});
  
      if (error) {
        setMessageTooltip(error);
        setTooltipType("error");
        setOpenTooltip(true);
      } else {
        setMessageTooltip("¡Correcto! Ya estás registrado.");
        setTooltipType("success");
        setOpenTooltip(true);
        navigate("/signin");
      }
      setOpenTooltip(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfo = (token) => {
    auth.userInfo(token).then((user) => {
      const userEmail = user.email;
      setCurrentEmail(userEmail);
      setLoggedIn(true);
      api.getInitialCards().then((cards) => {
        if (Array.isArray(cards)) {
          setCards(cards);
        }
      });
      api.getUserInfo().then((user) => {
        setCurrentUser(user);
        navigate("/");
      });
    });
  };

  return (
    <>
      <div className="root__container">
        <CurrentUserContext.Provider value={{ currentUser }}>
          <Header
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            currentEmail={currentEmail}
            currentPage={setCurrentPage}
          />

          <Routes>
            <Route
              path="/signin"
              element={<Login handleSubmit={handleLogin} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    handleSubmit={handleLogin}
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    isOpen={setIsOpenConfirmation}
                    cards={cards}
                    onClose={closeAllPopups}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    setCardToDelete={setCardToDelete}
                    selectedCard={selectedCard}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={<Register handleSubmit={handleRegister} />}
            />
            <Route path="*" element={<NotPage />} />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="confirm"
            isOpen={isOpenConfirmation}
            titulo="¿Estas Seguro?"
            button="Sí"
            isactiveButton={false}
            form="form-confirm"
            onClose={closeAllPopups}
            onSubmit={handleSubmit}
           
          />
          <InfoTooltip
            isOpen={openTooltip}
            name="tooltip"
            form="form-tooltip"
            isSuccess={tooltipType}
            onClose={closeAllPopups}
            message={setMessageTooltip}
          />
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
