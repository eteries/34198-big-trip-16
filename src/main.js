import { createTripInfoTemplate } from './views/trip-info';
import { createTripRouteTemplate } from './views/trip-route';
import { createTripCostTemplate } from './views/trip-cost';

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const tripMainElement = document.querySelector('.trip-main');
render(tripMainElement, createTripInfoTemplate(), 'beforeend');

const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, createTripRouteTemplate(), 'beforeend');
render(tripInfoElement, createTripCostTemplate(), 'beforeend');
