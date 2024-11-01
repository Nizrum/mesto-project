import { config } from "./index.js";

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`Ошибка ${res.status}`);
	}
};

const getUser = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "GET",
		headers: config.headers,
	}).then(checkResponse);
};

const getCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		method: "GET",
		headers: config.headers,
	}).then(checkResponse);
};

const updateProfile = (name, about) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({ name, about }),
	}).then(checkResponse);
};

const updateAvatar = (link) => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({ avatar: link }),
	}).then(checkResponse);
};

const addCard = (name, link) => {
	return fetch(`${config.baseUrl}/cards`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({ name, link }),
	}).then(checkResponse);
};

const deleteCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	}).then(checkResponse);
};

const putLike = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: config.headers,
	}).then(checkResponse);
};

const removeLike = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	}).then(checkResponse);
};

export { getUser, getCards, updateProfile, addCard, deleteCard, putLike, removeLike, updateAvatar };
