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

import { Positions, renderTemplate } from './utils/render';

const RENDERED_EVENTS_NUMBER = 3;

const tripMainElement = document.querySelector('.trip-main');
renderTemplate(tripMainElement, createTripInfoTemplate(), Positions.AFTER_BEGIN);

const tripInfoElement = tripMainElement.querySelector('.trip-info');
renderTemplate(tripInfoElement, createTripRouteTemplate(), Positions.BEFORE_END);
renderTemplate(tripInfoElement, createTripCostTemplate(), Positions.BEFORE_END);

const controlsElement = tripMainElement.querySelector('.trip-controls');
renderTemplate(controlsElement, createNavigationTemplate(), Positions.BEFORE_END);
renderTemplate(controlsElement, createFiltersTemplate(), Positions.BEFORE_END);

const pageTripEventsElement = document.querySelector('.trip-events');
renderTemplate(pageTripEventsElement, createSortingTemplate(), Positions.BEFORE_END);
renderTemplate(pageTripEventsElement, createTripEventsTemplate(), Positions.BEFORE_END);
renderTemplate(pageTripEventsElement, createLoadingTemplate(), Positions.BEFORE_END);
renderTemplate(pageTripEventsElement, createStatisticsTemplate(), Positions.AFTER_END);

const pageEventListElement = pageTripEventsElement.querySelector('.trip-events__list');
renderTemplate(pageEventListElement, createTripEventEditTemplate(), Positions.BEFORE_END);
for (let i = 0; i < RENDERED_EVENTS_NUMBER; i++) {
  renderTemplate(pageEventListElement, createTripEventTemplate(), Positions.BEFORE_END);
}
