import { createElement } from '../utils/dom';

const createLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class Loading {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createLoadingTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
