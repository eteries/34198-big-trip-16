import { createElement } from '../utils/render';

const createPointsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class Points {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPointsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
