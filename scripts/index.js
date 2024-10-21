const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(name, link) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.card__title').textContent = name;
    card.querySelector('.card__image').src = link;
    return card;
}

initialCards.forEach(card => {
    placesList.append(createCard(card.name, card.link));
});