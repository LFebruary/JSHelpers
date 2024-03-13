/*
 * JSHelpers v0.0.12 https://github.com/LFebruary/JSHelpers
 * (c) 2024 LFebruary - Released under the MIT License (https://github.com/LFebruary/JSHelpers/blob/master/LICENSE)
 */

/**
 * Watches for changes in a specified class on a target node and triggers callbacks accordingly.
 */
class ClassObserver {
  /**
   * Constructs a new ClassObserver.
   * @param {Node} target  - The target node to observe.
   * @param {string} classToWatch - The class to watch for changes.
   * @param {Function} onClassAdded  - The callback function to execute when the class is added.
   * @param {Function} onClassRemoved  - The callback function to execute when the class is removed.
   */
  constructor(target, classToWatch, onClassAdded, onClassRemoved) {
    /**
     * The target node to observe for class changes.
     * @type {Node}
     */
    this.target = target;

    /**
     * The class to watch for changes.
     * @type {string}
     */
    this.classToWatch = classToWatch;

    /**
     * The callback function to execute when the class is added.
     * @type {Function}
     */
    this.onClassAdded = onClassAdded;

    /**
     * The callback function to execute when the class is removed.
     * @type {Function}
     */
    this.onClassRemoved = onClassRemoved;

    /**
     * The MutationObserver instance used to observe changes.
     * @type {MutationObserver|null}
     */
    this.observer = null;
  }

  /**
   * Initializes the observer.
   */
  init() {
    this.observer = new MutationObserver(this.mutationCallback);
    this.observe();
    Object.freeze(this);
  }

  /**
   * Starts observing changes.
   */
  observe() {
    this.observer.observe(this.target, { attributes: true });
  }

  /**
   * Disconnects the observer.
   */
  disconnect() {
    this.observer.disconnect();
  }

  /**
   * Mutation callback function.
   * @param {MutationRecord[]} mutationsList - The list of mutations.
   */
  mutationCallback = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const currentClassState = mutation.target.classList.contains(
          this.classToWatch,
        );
        if (this.lastClassState !== currentClassState) {
          this.lastClassState = currentClassState;
          if (currentClassState) {
            this.onClassAdded();
          } else {
            this.onClassRemoved();
          }
        }
      }
    }
  };
}
