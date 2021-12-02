import { formatTripDuration } from '../utils/date';
import { createElement } from '../utils/render';

const formatRoute = (cities) => (
  cities.length < 4
    ? `${cities.join(' - ')}`
    : `${cities[0]} ... ${cities[cities.length - 1]}`
);

const createRouteTemplate = (destinations, dateFrom, dateTo) => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${formatRoute(destinations)}</h1>

    <p class="trip-info__dates">${formatTripDuration(dateFrom, dateTo)}</p>
  </div>`
);

export default class Route {
  #element = null;
  #destinations;
  #dateFrom;
  #dateTo;

  constructor(destinations, dateFrom, dateTo) {
    this.#destinations = destinations;
    this.#dateFrom = dateFrom;
    this.#dateTo = dateTo;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createRouteTemplate(this.#destinations, this.#dateFrom, this.#dateTo);
  }

  removeElement() {
    this.#element = null;
  }
}
