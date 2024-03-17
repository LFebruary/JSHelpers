/*
 * JSHelpers v0.0.17 https://github.com/LFebruary/JSHelpers
 * (c) 2024 LFebruary - Released under the MIT License (https://github.com/LFebruary/JSHelpers/blob/master/LICENSE)
 */

/**
 * Validator is a class for validating input elements based on custom validation functions.
 * 
 */
class Validator {
    /**
     * Creates an instance of Validator.
     * @param {HTMLInputElement} inputElement - The input element to validate.
     * @param {(value: string | null) => string | null} validation - The validation function to apply to the input element's value.
     * @param {string[]} errorClasses - An array of CSS classes to apply when the input value is invalid.
     * @param {string[]} validClasses - An array of CSS classes to apply when the input value is valid.
     */
    constructor(inputElement, validation, errorClasses, validClasses) {
        /**
         * The input element to validate.
         * @type {HTMLInputElement}
         */
        this.inputElement = inputElement;

        /**
         * The validation function to apply to the input element's value.
         * @type {{(value: string | null) => string | null} validation }
         */
        this.validation = validation;

        if (errorClasses) {
            /**
             * An array of CSS classes to apply when the input value is invalid.
             * @type {string[] | null}
             */
            this.errorClasses = errorClasses;
        }

        if (validClasses) {
            /**
             * An array of CSS classes to apply when the input value is valid.
             * @type {string[] | null}
             */
            this.validClasses = validClasses;
        }

        this.errorText = document.createElement('p');
        this.errorText.style.color = 'red';

        this.inputElement.onblur = () => {
            const validationError = this.validation(this.inputElement.value);
            if (!validationError) {
                this.inputElement.setAttribute('data-valid', true);
                if (this.errorClasses && this.inputElement.classList.contains(this.errorClasses[0])) {
                    this.inputElement.classList.remove(this.errorClasses);
                }

                if (this.validClasses && !this.inputElement.classList.contains(this.validClasses[0])) {
                    this.inputElement.classList.add(this.validClasses);
                }

                this.errorText.remove();

                return;
            }


            this.inputElement.setAttribute('data-valid', false);
            this.inputElement.setAttribute('data-error', validationError);

            if (this.errorClasses && !this.inputElement.classList.contains(this.errorClasses[0])) {
                this.inputElement.classList.add(this.errorClasses);
            }

            if (this.validClasses && this.inputElement.classList.contains(this.validClasses[0])) {
                this.inputElement.classList.remove(this.validClasses);
            }

            this.errorText.innerHTML = validationError;
            this.inputElement.parentElement.appendChild(this.errorText);
        };

        Object.freeze(this);
    }

    /**
     * Disposes of the Validator instance, removing event listeners and error text.
     */
    dispose = function () {
        this.errorText.remove();
        this.inputElement.onblur = null;
    }
}