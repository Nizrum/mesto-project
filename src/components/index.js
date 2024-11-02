import "../pages/index.css";
import { enableValidation } from "./validation.js";
import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { login, getUser, getCards, updateProfile, addCard, updateAvatar } from "./api.js";

let userId;

const page = document.querySelector(".page");
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const loader = document.querySelector(".loader");
const logoutButton = document.querySelector(".header__logout-button");

const profilePopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileFormElement = profilePopup.querySelector(".popup__form");
const popupInputName = profilePopup.querySelector(".popup__input_type_name");
const popupInputDescription = profilePopup.querySelector(".popup__input_type_description");
const profilePopupSubmitButton = profilePopup.querySelector(".popup__button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardPopup = document.querySelector(".popup_type_new-card");
const cardAddButton = document.querySelector(".profile__add-button");
const cardFormElement = cardPopup.querySelector(".popup__form");
const cardPopupSubmitButton = cardPopup.querySelector(".popup__button");
const popupInputCardName = cardPopup.querySelector(".popup__input_type_card-name");
const popupInputCardImgUrl = cardPopup.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarFormElement = avatarPopup.querySelector(".popup__form");
const avatarPopupSubmitButton = avatarPopup.querySelector(".popup__button");
const popupInputAvatarLink = avatarPopup.querySelector(".popup__input_type_url");
const avatarCover = document.querySelector(".profile__image-cover");
const profileImage = document.querySelector(".profile__image");

const loginPopup = document.querySelector(".popup_type_login");
const loginFormElement = loginPopup.querySelector(".popup__form");
const loginPopupSubmitButton = loginPopup.querySelector(".popup__button");
const popupInputToken = loginPopup.querySelector(".popup__input_type_token");
const popupInputGroup = loginPopup.querySelector(".popup__input_type_group");

const validationSettings = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__button",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__error_visible",
};

function openProfilePopup() {
	popupInputName.value = profileTitle.textContent;
	popupInputDescription.value = profileDescription.textContent;
	openModal(profilePopup);
}

function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	profilePopupSubmitButton.textContent = "Сохранение...";

	const name = popupInputName.value;
	const about = popupInputDescription.value;

	updateProfile(name, about)
		.then((res) => {
			profileTitle.textContent = res.name;
			profileDescription.textContent = res.about;
			closeModal(profilePopup);
		})
		.catch((err) => alert(err))
		.finally(() => {
			profilePopupSubmitButton.textContent = "Сохранить";
		});
}

function openCardAddPopup() {
	popupInputCardName.value = "";
	popupInputCardImgUrl.value = "";
	openModal(cardPopup);
}

function handleCardFormSubmit(evt) {
	evt.preventDefault();
	cardPopupSubmitButton.textContent = "Сохранение...";

	addCard(popupInputCardName.value, popupInputCardImgUrl.value)
		.then((card) => {
			placesList.prepend(
				createCard(card.name, card.link, card.likes.length, card._id, card.owner._id, userId, card.likes)
			);
			closeModal(cardPopup);
		})
		.catch((err) => alert(err))
		.finally(() => {
			cardPopupSubmitButton.textContent = "Сохранить";
		});
}

function openAvatarEditPopup() {
	popupInputAvatarLink.value = "";
	openModal(avatarPopup);
}

function handleAvatarFormSubmit(evt) {
	evt.preventDefault();
	avatarPopupSubmitButton.textContent = "Сохранение...";

	updateAvatar(popupInputAvatarLink.value)
		.then((user) => {
			profileImage.style.backgroundImage = `url(${user.avatar})`;
			closeModal(avatarPopup);
		})
		.catch((err) => alert(err))
		.finally(() => {
			avatarPopupSubmitButton.textContent = "Сохранить";
		});
}

function loadPage() {
	Promise.all([getUser(), getCards()])
		.then(([user, cards]) => {
			profileTitle.textContent = user.name;
			profileDescription.textContent = user.about;
			profileImage.style = `background-image: url('${user.avatar}');`;
			userId = user._id;
			cards.forEach((card) => {
				placesList.append(
					createCard(card.name, card.link, card.likes.length, card._id, card.owner._id, userId, card.likes)
				);
			});
			closeModal(loginPopup);
		})
		.catch((err) => alert(err))
		.finally(() => {
			loginPopupSubmitButton.textContent = "Войти";
			hideLoader();
		});
}

function handleLoginFormSubmit(evt) {
	evt.preventDefault();
	loginPopupSubmitButton.textContent = "Вход...";

	login(popupInputToken.value, popupInputGroup.value)
		.then((res) => {
			loadPage();
		})
		.catch((err) => {
      loginPopupSubmitButton.textContent = "Войти";
      alert('Неверный токен или ссылка на группу. Попробуйте ещё раз.');
    });
}

function showLoader() {
	loader.classList.add("loader_visible");
	page.classList.add("page_no-scroll");
}

function hideLoader() {
	loader.classList.remove("loader_visible");
	page.classList.remove("page_no-scroll");
}

popupCloseButtons.forEach((button) => {
	button.addEventListener("click", () => {
		closeModal(button.closest(".popup"));
	});
});

popups.forEach((popup) => {
	if (!popup.classList.contains("popup_type_login")) {
		popup.classList.add("popup_is-animated");
		popup.addEventListener("mousedown", (evt) => {
			if (!evt.target.closest(".popup__content")) {
				closeModal(popup);
			}
		});
	}
});

profileEditButton.addEventListener("click", openProfilePopup);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardAddButton.addEventListener("click", openCardAddPopup);
cardFormElement.addEventListener("submit", handleCardFormSubmit);
avatarCover.addEventListener("click", openAvatarEditPopup);
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);
loginFormElement.addEventListener("submit", handleLoginFormSubmit);
logoutButton.addEventListener("click", () => {
	localStorage.removeItem("config");
  window.location.reload();
});

enableValidation(validationSettings);

if (localStorage.getItem("config") != null) {
	closeModal(loginPopup);
	showLoader();
	loadPage();
}

export { cardTemplate, imagePopup, popupImage, popupCaption };
