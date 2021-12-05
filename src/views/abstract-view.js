import { createElement } from '../utils/dom';

export default class AbstractView {
  #element = null;

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate an abstract view, only a concrete one');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('The template getter hasn\'t implemented');
  }

  removeElement() {
    this.#element = null;
  }
}
