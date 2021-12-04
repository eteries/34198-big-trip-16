import { createElement } from '../utils/dom';
import { Messages, Filters } from '../constants';

const createEmptyTemplate = (activeFilter = Filters.Everything) => (
  `<p class="trip-events__msg">${Messages[activeFilter]}</p>`
);

export default class Empty {
  #element = null;

  constructor(activeFilter) {
    this.activeFilter = activeFilter;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyTemplate(this.activeFilter);
  }

  removeElement() {
    this.#element = null;
  }
}
