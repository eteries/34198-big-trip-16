import HeaderView from './views/header.js';
import RouteView from './views/route.js';
import CostView from './views/cost.js';
import StatisticsView from './views/statistics.js';
import LoadingView from './views/loading.js';
import PointsView from './views/points.js';
import PointView from './views/point.js';
import PointEditView from './views/point-edit.js';
import NavigationView from './views/navigation.js';
import FiltersView from './views/filters.js';
import SortingView from './views/sorting.js';

import { generatePoint } from './mocks/point';
import { Positions, renderElement, renderTemplate } from './utils/render';
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
renderElement(tripMainElement, new HeaderView().element, Positions.AFTER_BEGIN);

const headerElement = tripMainElement.querySelector('.trip-info');
renderElement(headerElement, new RouteView(uniqueDestinations, startDate, endDate).element, Positions.BEFORE_END);
renderElement(headerElement, new CostView(cost).element, Positions.BEFORE_END);

const controlsElement = tripMainElement.querySelector('.trip-controls');
renderElement(controlsElement, new NavigationView().element, Positions.BEFORE_END);
renderElement(controlsElement, new FiltersView().element, Positions.BEFORE_END);

const pageTripEventsElement = document.querySelector('.trip-events');
renderElement(pageTripEventsElement, new SortingView().element, Positions.BEFORE_END);
renderElement(pageTripEventsElement, new PointsView().element, Positions.BEFORE_END);
renderElement(pageTripEventsElement, new LoadingView().element, Positions.BEFORE_END);
renderElement(pageTripEventsElement, new StatisticsView().element, Positions.AFTER_END);

const pageEventListElement = pageTripEventsElement.querySelector('.trip-events__list');
renderElement(pageEventListElement, new PointEditView(generatePoint()).element, Positions.BEFORE_END);
points
  .sort(((pointA, pointB) => getDifference(pointA.dateFrom, pointB.dateFrom)))
  .forEach((point) => renderElement(pageEventListElement, new PointView(point).element, Positions.BEFORE_END));

