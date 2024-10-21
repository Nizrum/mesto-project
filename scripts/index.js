const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileFormElement = profilePopup.querySelector(".popup__form");
const popupInputName = profilePopup.querySelector(".popup__input_type_name");
const popupInputDescription = profilePopup.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardAddButton = document.querySelector(".profile__add-button");
const cardFormElement = cardPopup.querySelector(".popup__form");
const popupInputCardName = cardPopup.querySelector(".popup__input_type_card-name");
const popupInputCardImgUrl = cardPopup.querySelector(".popup__input_type_url");

function createCard(name, link) {
	const card = cardTemplate.cloneNode(true);
	card.querySelector(".card__title").textContent = name;
	card.querySelector(".card__image").src = link;
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

initialCards.forEach((card) => {
	placesList.append(createCard(card.name, card.link));
});

popupCloseButtons.forEach((button) => {
	button.addEventListener("click", () => {
		closeModal(button.closest(".popup"));
	});
});

profileEditButton.addEventListener("click", openProfilePopup);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardAddButton.addEventListener("click", openCardAddPopup);
cardFormElement.addEventListener("submit", handleCardFormSubmit);
