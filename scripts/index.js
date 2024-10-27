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
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function createCard(name, link) {
	const card = cardTemplate.cloneNode(true);
	const cardImage = card.querySelector(".card__image");
	const cardTitle = card.querySelector(".card__title");
	cardTitle.textContent = name;
	cardImage.src = link;
	cardImage.alt = name;
	card.querySelector(".card__like-button").addEventListener("click", (evt) => {
		evt.target.classList.toggle("card__like-button_is-active");
	});
	card.querySelector(".card__delete-button").addEventListener("click", (evt) => {
		evt.target.closest(".card").remove();
	});
	cardImage.addEventListener("click", () => {
		popupImage.src = cardImage.src;
		popupImage.alt = cardTitle.textContent;
		popupCaption.textContent = cardTitle.textContent;
		openModal(imagePopup);
	});
	return card;
}

function openModal(popup) {
	popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
	popup.classList.remove("popup_is-opened");
}

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

function showInputError(formElement, inputElement, errorMessage, settings) {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(settings.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(settings.inputErrorClass);
	errorElement.classList.remove(settings.errorClass);
	errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, settings) {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, settings);
	} else {
		hideInputError(formElement, inputElement, settings);
	}
}

function hasInvalidInput(inputList) {
	return inputList.some((input) => input.validity.valid == false);
}

function toggleButtonState(inputList, buttonElement, settings) {
	if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "true");
		buttonElement.classList.add(settings.inactiveButtonClass);
	} else {
    buttonElement.removeAttribute("disabled");
		buttonElement.classList.remove(settings.inactiveButtonClass);
	}
}

function setEventListeners(formElement, settings) {
	const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
	const buttonElement = formElement.querySelector(settings.submitButtonSelector);
	toggleButtonState(inputList, buttonElement, settings);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", function () {
			checkInputValidity(formElement, inputElement, settings);
			toggleButtonState(inputList, buttonElement, settings);
		});
	});
}

function enableValidation(settings) {
	const formList = Array.from(document.querySelectorAll(settings.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener("submit", function (evt) {
			evt.preventDefault();
		});

		setEventListeners(formElement, settings);
	});
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
});

profileEditButton.addEventListener("click", openProfilePopup);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardAddButton.addEventListener("click", openCardAddPopup);
cardFormElement.addEventListener("submit", handleCardFormSubmit);

enableValidation(validationSettings);
