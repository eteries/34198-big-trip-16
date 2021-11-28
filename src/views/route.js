import { formatTripDuration } from '../utils/date';

const formatRoute = (cities) => (
  cities.length < 4
    ? `${cities.join(' - ')}`
    : `${cities[0]} ... ${cities[cities.length - 1]}`
);

export const createRouteTemplate = (destinations, dateFrom, dateTo) => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${formatRoute(destinations)}</h1>

    <p class="trip-info__dates">${formatTripDuration(dateFrom, dateTo)}</p>
  </div>`
);
