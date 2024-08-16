import './index.css';
import { config, sectionCard, btnPopupEdit, btnPopupPlace, avatar, profileName, profileAbout, inputProfileName, inputProfileAbout, inputNamePlace, inputUrlPlace, popupFormProfile, popupFormPlace, buttonEditProfile, avatarSection, overlayAvatar, popupEditAvatar, popupFormAvatar, closeFormAvatar, inputUrlAvatar, submitPopupPlace, submitPopupProfile, initialCards, buttonSaveAvatar, popupConfirm } from '../utils/utils.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import api  from '../utils/api.js';


function removeRemoteLike(idCard, buttonLike, callback) {
  return api.deleteLikeCard(idCard).then((res) => {
    buttonLike.classList.remove("card__place-button--like-active");
    callback(res)
  })
    .catch(error => console.warn(error))
}
function remoteLike(idCard, isLiked, buttonLike, callback) {
  api.likeCard(idCard, isLiked).then((res) => {
    buttonLike.classList.add("card__place-button--like-active");
    callback(res)
  })
    .catch(error => console.warn(error))
}
const formValidatorProfile = new FormValidator(config, popupFormProfile);
formValidatorProfile.enableValidation();

const formValidatorNewCard = new FormValidator(config, popupFormPlace);
formValidatorNewCard.enableValidation();

const popupImage = new PopupWithImage('.popup-img-close-image')


export function getUsers() {
  api.getUserInfo()
    .then((dataUser) => {
      profileName.textContent = dataUser.name;
      profileAbout.textContent = dataUser.about;
      avatar.src = dataUser.avatar;
      avatar.alt = dataUser.name;
      const currentUserId = dataUser._id;
      createCard(currentUserId);
      return currentUserId;
    }).catch((error) => {
      console.warn(`Error al obtener la información del usuario: ${error.message}`);
    });
}
getUsers();


function createCard(currentUserId) {
  const sectionContainerCard = new Section(
    {
      items: initialCards,
      renderer: (data) => {
        const cardNew = new Card(
          data,
          '.card',
          function () {
            popupImage.openPopUp(data.name, data.link)
          },
          remoteLike,
          removeRemoteLike,
          currentUserId,
          popupConfirm

        );
        const cardList = cardNew.generateCard();
        sectionContainerCard.defaultAddItem(cardList);
      },
    },
    sectionCard
  );
  api.getInitialCards()
    .then((cards) => {
      sectionContainerCard.setItems(cards);
    }).finally(() => {
      sectionContainerCard.rendererItems();
    })
  containerCard(sectionContainerCard)
}


function addOverlayAvatar() {
  buttonEditProfile.classList.add('profile__avatar-edit--show');
  overlayAvatar.classList.add('profile__overlay-avatar--show')
}
function removeOverlayAvatar() {
  buttonEditProfile.classList.remove('profile__avatar-edit--show')
  overlayAvatar.classList.remove('profile__overlay-avatar--show')
}

avatarSection.addEventListener('mouseover', addOverlayAvatar)
avatarSection.addEventListener('mouseout', removeOverlayAvatar)


buttonEditProfile.addEventListener('click', () => {
  popupEditAvatar.classList.add('popup-avatar-edit--show');
})
closeFormAvatar.addEventListener('click', () => {
  popupEditAvatar.classList.remove('popup-avatar-edit--show');
})


popupFormAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  buttonSaveAvatar.textContent = "Guardando..."
  api.updateAvatar(inputUrlAvatar.value)
    .then((avatarUrl) => {
      avatar.src = avatarUrl.avatar;
      avatar.alt = 'Avatar'
      popupEditAvatar.classList.remove('popup-avatar-edit--show');
      buttonSaveAvatar.textContent = "Guardar";
      inputUrlAvatar.value = '';
    })
    .catch((error) => {
      console.error("Error al actualizar el Avatar:", error);
    });
})

const userInfo = new UserInfo(profileName, profileAbout);

btnPopupEdit.addEventListener('click', () => {
  formProfile.openPopUp();
  submitPopupProfile.textContent = "Guardar";
  formProfile._getInputValues();
})
const formProfile = new PopupWithForm('.popup-profile', () => {

  submitPopupProfile.textContent = "Guardando...";
  api.updateUser(inputProfileName.value, inputProfileAbout.value).then((user) => {
    userInfo.setUserInfo({ name: inputProfileName.value, about: inputProfileAbout.value })
  })
    .catch((error) => {
      console.error("Error al actualizar el perfil:", error);
    })
})
const formValidatorAvatar = new FormValidator(config, popupFormAvatar);
formValidatorAvatar.enableValidation();

function containerCard(sectionContainerCard) {

  const formPlace = new PopupWithForm('.popup-place', () => {
    const nameCard = inputNamePlace.value;
    const linkCard = inputUrlPlace.value;
    submitPopupPlace.textContent = "Guardando..."
    api.addCard(nameCard, linkCard)
      .then(newCard => {
        let currentUserId = newCard.owner._id;
        const createOneCard = new Card(
          newCard,
          '.card',
          function () {
            popupImage.openPopUp(nameCard, linkCard)
          },
          remoteLike,
          removeRemoteLike,
          currentUserId,
          popupConfirm,
        );
        const cardElement = createOneCard.generateCard()
        sectionContainerCard.addItem(cardElement, true)
        submitPopupPlace.textContent = "Guardar";
        inputNamePlace.value = "";
        inputUrlPlace.value = "";
      })
  })

  btnPopupPlace.addEventListener('click', () => {
    formPlace.openPopUp()
  })

  submitPopupPlace.addEventListener('click', () => {
    formPlace.closePopUp();
  })
}


