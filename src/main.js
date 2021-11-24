import { createTripInfoTemplate } from './views/trip-info.js';
import { createTripRouteTemplate } from './views/trip-route.js';
import { createTripCostTemplate } from './views/trip-cost.js';
import { createStatisticsTemplate } from './views/statistics.js';
import { createLoadingTemplate } from './views/loading.js';
import { createTripEventsTemplate } from './views/trip-events.js';
import { createTripEventTemplate } from './views/trip-event.js';
import { createTripEventEditTemplate } from './views/trip-event-edit.js';
import { createNavigationTemplate } from './views/navigation.js';
import { createFiltersTemplate } from './views/filters.js';
import { createSortingTemplate } from './views/sorting.js';

const RENDERED_EVENTS_NUMBER = 3;

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const tripMainElement = document.querySelector('.trip-main');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');

const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, createTripRouteTemplate(), 'beforeend');
render(tripInfoElement, createTripCostTemplate(), 'beforeend');

const controlsElement = tripMainElement.querySelector('.trip-controls');
render(controlsElement, createNavigationTemplate(), 'beforeend');
render(controlsElement, createFiltersTemplate(), 'beforeend');

const pageTripEventsElement = document.querySelector('.trip-events');
render(pageTripEventsElement, createSortingTemplate(), 'beforeend');
render(pageTripEventsElement, createTripEventsTemplate(), 'beforeend');
render(pageTripEventsElement, createLoadingTemplate(), 'beforeend');
render(pageTripEventsElement, createStatisticsTemplate(), 'afterend');

const pageEventListElement = pageTripEventsElement.querySelector('.trip-events__list');
render(pageEventListElement, createTripEventEditTemplate(), 'beforeend');
for (let i = 0; i < RENDERED_EVENTS_NUMBER; i++) {
  render(pageEventListElement, createTripEventTemplate(), 'beforeend');
}
