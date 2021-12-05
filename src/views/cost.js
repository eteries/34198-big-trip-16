import AbstractView from './abstract-view';

const createCostTemplate = (cost = 0) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`
);

export default class Cost extends AbstractView {
  constructor(cost) {
    super();
    this.cost = cost;
  }

  get template() {
    return createCostTemplate(this.cost);
  }
}
