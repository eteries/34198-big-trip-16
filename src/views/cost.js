import { createElement } from '../utils/dom';

const createCostTemplate = (cost = 0) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`
);

export default class Cost {
  #element = null;
  cost;

  constructor(cost) {
    this.cost = cost;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createCostTemplate(this.cost);
  }

  removeElement() {
    this.#element = null;
  }
}
