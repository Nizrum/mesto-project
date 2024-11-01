import { cardTemplate, imagePopup, popupImage, popupCaption } from "./index.js";
import { openModal } from "./modal.js";
import { deleteCard, putLike, removeLike } from "./api.js";

export function createCard(name, link, likesAmount, id, ownerId, userId, likers) {
	const card = cardTemplate.cloneNode(true);
	const cardImage = card.querySelector(".card__image");
	const cardTitle = card.querySelector(".card__title");
	const cardLikesCounter = card.querySelector(".card__likes-counter");
	const cardLikeButton = card.querySelector(".card__like-button");
	cardTitle.textContent = name;
	cardImage.src = link;
	cardImage.alt = name;
	cardLikesCounter.textContent = likesAmount;
	if (likers.some((liker) => liker._id == userId)) {
		cardLikeButton.classList.add("card__like-button_is-active");
	} else {
		cardLikeButton.classList.remove("card__like-button_is-active");
	}
	cardLikeButton.addEventListener("click", (evt) => {
		if (likers.some((liker) => liker._id == userId)) {
			evt.target.classList.remove("card__like-button_is-active");
			removeLike(id)
				.then((card) => {
					cardLikesCounter.textContent = card.likes.length;
					likers = card.likes;
				})
				.catch((err) => alert(err));
		} else {
			evt.target.classList.add("card__like-button_is-active");
			putLike(id)
				.then((card) => {
					cardLikesCounter.textContent = card.likes.length;
					likers = card.likes;
				})
				.catch((err) => alert(err));
		}
	});
	if (ownerId === userId) {
		card.querySelector(".card__delete-button").addEventListener("click", (evt) => {
			deleteCard(id)
				.then(() => {
					evt.target.closest(".card").remove();
				})
				.catch((err) => alert(err));
		});
	} else {
		card.querySelector(".card__delete-button").remove();
	}
	cardImage.addEventListener("click", () => {
		popupImage.src = cardImage.src;
		popupImage.alt = cardTitle.textContent;
		popupCaption.textContent = cardTitle.textContent;
		openModal(imagePopup);
	});
	return card;
}
