import { formatTripDuration } from '../utils/date';
import AbstractView from './abstract-view';

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

export default class Route extends AbstractView {
  constructor(destinations, dateFrom, dateTo) {
    super();
    this.destinations = destinations;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }

  get template() {
    return createRouteTemplate(this.destinations, this.dateFrom, this.dateTo);
  }
}
