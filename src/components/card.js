import { cardTemplate, imagePopup, popupImage, popupCaption } from "./index.js";
import { openModal } from "./modal.js";

export function createCard(name, link) {
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