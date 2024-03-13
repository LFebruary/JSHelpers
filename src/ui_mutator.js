/*
 * JSHelpers v0.0.12 https://github.com/LFebruary/JSHelpers
 * (c) 2024 LFebruary - Released under the MIT License (https://github.com/LFebruary/JSHelpers/blob/master/LICENSE)
 */

/**
 * UIMutator is a class that facilitates observing changes in an input element and triggering a callback upon mutation.
 */
class UIMutator {
    /**
     * Creates an instance of UIMutator.
     * @param {Element} mutateElement - The element to mutate based on changes in the observeElement.
     * @param {HTMLInputElement} observeElement - The input element to observe for changes.
     * @param {(Element, String) => void} onMutation - The callback function to execute upon mutation.
     * @param {() => void | null} [onEmptyInput=null] - An optional callback function to execute if the observed input element becomes empty.
     */
    constructor(mutateElement, observeElement, onMutation, onEmptyInput = null) {
        /**
         * The element to mutate based on changes in the observeElement.
         * @type {Element}
         */
        this.mutateElement = mutateElement;

        /**
         * The input element to observe for changes.
         * @type {HTMLInputElement}
         */
        this.observeElement = observeElement;

        /**
         * The callback function to execute upon mutation.
         * @type {(Element, String) => void}
         */
        this.onMutation = onMutation;

        /**
         * An optional callback function to execute if the observed input element becomes empty.
         * @type {() => void | null}
         */
        this.onEmptyInput = onEmptyInput;

        /**
         * Indicates whether the UIMutator instance is bound to an element.
         * @type {boolean}
         */
        this.bound = false;
    }

    /**
     * Binds the UIMutator instance to the observeElement, triggering the onMutation callback upon blur.
     * Throws an error if the UIMutator instance is already bound.
     */
    bind = () => {
        if (this.bound == true) {
            throw new Error('Can not bind an element that is already bound.');
        }

        this.bound = true;
        this.observeElement.onblur = () => {
            let value = this.observeElement.value;
            if (this.onEmptyInput != null && !value) {
                this.onEmptyInput();
                return;
            }

            this.onMutation(this.observeElement, value);
        };
    };

    /**
     * Unbinds the UIMutator instance from the observeElement, removing the blur event listener.
     */
    unbind = () => {
        this.observeElement.onblur = null;
        this.bound = false;
    };
}
