import '../pages/index.css';
import { initialCards } from "./cards.js";
import { enableValidation } from "./validation.js";
import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const profilePopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileFormElement = profilePopup.querySelector(".popup__form");
const popupInputName = profilePopup.querySelector(".popup__input_type_name");
const popupInputDescription = profilePopup.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardPopup = document.querySelector(".popup_type_new-card");
const cardAddButton = document.querySelector(".profile__add-button");
const cardFormElement = cardPopup.querySelector(".popup__form");
const popupInputCardName = cardPopup.querySelector(".popup__input_type_card-name");
const popupInputCardImgUrl = cardPopup.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

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
	const name = popupInputName.value;
	const job = popupInputDescription.value;

	profileTitle.textContent = name;
	profileDescription.textContent = job;

	closeModal(profilePopup);
}

function openCardAddPopup() {
	popupInputCardName.value = "";
	popupInputCardImgUrl.value = "";
	openModal(cardPopup);
}

function handleCardFormSubmit(evt) {
	evt.preventDefault();
	placesList.prepend(createCard(popupInputCardName.value, popupInputCardImgUrl.value));
	closeModal(cardPopup);
}

initialCards.forEach((card) => {
	placesList.append(createCard(card.name, card.link));
});

popupCloseButtons.forEach((button) => {
	button.addEventListener("click", () => {
		closeModal(button.closest(".popup"));
	});
});

popups.forEach((popup) => {
	popup.classList.add("popup_is-animated");
	popup.addEventListener("click", (evt) => {
		if (!evt.target.closest(".popup__content")) {
			closeModal(popup);
		}
	});
});

profileEditButton.addEventListener("click", openProfilePopup);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardAddButton.addEventListener("click", openCardAddPopup);
cardFormElement.addEventListener("submit", handleCardFormSubmit);

enableValidation(validationSettings);

export { cardTemplate, imagePopup, popupImage, popupCaption };