import { createElement } from '../utils/render';

const createHeaderTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class Header {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createHeaderTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
