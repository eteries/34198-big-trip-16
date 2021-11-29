import { createHeaderTemplate } from './views/header.js';
import { createRouteTemplate } from './views/route.js';
import { createCostTemplate } from './views/cost.js';
import { createStatisticsTemplate } from './views/statistics.js';
import { createLoadingTemplate } from './views/loading.js';
import { createPointsTemplate } from './views/points.js';
import { createPointTemplate } from './views/point.js';
import { createPointEditTemplate } from './views/point-edit.js';
import { createNavigationTemplate } from './views/navigation.js';
import { createFiltersTemplate } from './views/filters.js';
import { createSortingTemplate } from './views/sorting.js';

import { generatePoint } from './mocks/point';
import { Positions, renderTemplate } from './utils/render';
import { getDifference } from './utils/date';
import { calculateCost, calculateTripEnd, calculateTripStart, getUniqueDestinations } from './utils/calculate';

const RENDERED_EVENTS_NUMBER = 15;
const points = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(generatePoint);

const cost = calculateCost(points);
const uniqueDestinations = getUniqueDestinations(points);
const startDate = calculateTripStart(points);
const endDate = calculateTripEnd(points);

const tripMainElement = document.querySelector('.trip-main');
renderTemplate(tripMainElement, createHeaderTemplate(), Positions.AFTER_BEGIN);

const headerElement = tripMainElement.querySelector('.trip-info');
renderTemplate(headerElement, createRouteTemplate(uniqueDestinations, startDate, endDate), Positions.BEFORE_END);
renderTemplate(headerElement, createCostTemplate(cost), Positions.BEFORE_END);

const controlsElement = tripMainElement.querySelector('.trip-controls');
renderTemplate(controlsElement, createNavigationTemplate(), Positions.BEFORE_END);
renderTemplate(controlsElement, createFiltersTemplate(), Positions.BEFORE_END);

const pageTripEventsElement = document.querySelector('.trip-events');
renderTemplate(pageTripEventsElement, createSortingTemplate(), Positions.BEFORE_END);
renderTemplate(pageTripEventsElement, createPointsTemplate(), Positions.BEFORE_END);
renderTemplate(pageTripEventsElement, createLoadingTemplate(), Positions.BEFORE_END);
renderTemplate(pageTripEventsElement, createStatisticsTemplate(), Positions.AFTER_END);

const pageEventListElement = pageTripEventsElement.querySelector('.trip-events__list');
renderTemplate(pageEventListElement, createPointEditTemplate(generatePoint()), Positions.BEFORE_END);
points
  .sort(((pointA, pointB) => getDifference(pointA.dateFrom, pointB.dateFrom)))
  .forEach((point) => renderTemplate(pageEventListElement, createPointTemplate(point), Positions.BEFORE_END));

