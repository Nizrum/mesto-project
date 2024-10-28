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

export function enableValidation(settings) {
	const formList = Array.from(document.querySelectorAll(settings.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener("submit", function (evt) {
			evt.preventDefault();
		});

		setEventListeners(formElement, settings);
	});
}