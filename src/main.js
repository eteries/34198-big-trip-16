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
import EmptyView from './views/empty';

import { generatePoint } from './mocks/point';
import { isEscape, Positions, render } from './utils/dom';
import { getDifference } from './utils/date';
import { calculateCost, calculateTripEnd, calculateTripStart, getUniqueDestinations } from './utils/calculate';
import { Filters, RENDERED_EVENTS_NUMBER } from './constants';

const renderPoint = (container, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const openEditor = () => {
    pointComponent.element.replaceWith(pointEditComponent.element);
  };

  const closeEditor = () => {
    pointEditComponent.element.replaceWith(pointComponent.element);
  };

  const onDocumentKeyDown = (evt) => {
    if (isEscape(evt)) {
      closeEditor();
      document.removeEventListener('keydown', onDocumentKeyDown);
    }
  };

  pointComponent.setOpenClickHandler(() => {
    openEditor();
    document.addEventListener('keydown', onDocumentKeyDown);
  });

  pointEditComponent.setCloseClickHandler(() => {
    closeEditor();
    document.removeEventListener('keydown', onDocumentKeyDown);
  });

  pointEditComponent.setSubmitHandler(() => {
    closeEditor();
    document.removeEventListener('keydown', onDocumentKeyDown);
  });

  render(container, pointComponent.element, Positions.BEFORE_END);
};

const renderTrip = (points) => {
  const cost = calculateCost(points);
  const uniqueDestinations = getUniqueDestinations(points);
  const startDate = calculateTripStart(points);
  const endDate = calculateTripEnd(points);
  const activeFilter = Filters.Everything;

  const tripMainElement = document.querySelector('.trip-main');
  const navigationElement = tripMainElement.querySelector('.trip-controls__navigation');
  const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
  const pageTripEventsElement = document.querySelector('.trip-events');

  render(navigationElement, new NavigationView(), Positions.BEFORE_END);
  render(filtersElement, new FiltersView(activeFilter), Positions.BEFORE_END);
  render(pageTripEventsElement, new StatisticsView(), Positions.AFTER_END);

  if (!points.length) {
    render(pageTripEventsElement, new EmptyView(activeFilter), Positions.BEFORE_END);
    return;
  }

  const headerComponent = new HeaderView();

  render(tripMainElement, headerComponent, Positions.AFTER_BEGIN);
  render(headerComponent, new RouteView(uniqueDestinations, startDate, endDate), Positions.BEFORE_END);
  render(headerComponent, new CostView(cost), Positions.BEFORE_END);
  render(pageTripEventsElement, new SortingView(), Positions.BEFORE_END);
  render(pageTripEventsElement, new PointsView(), Positions.BEFORE_END);
  render(pageTripEventsElement, new LoadingView(), Positions.BEFORE_END);

  const pageEventListElement = pageTripEventsElement.querySelector('.trip-events__list');
  points
    .sort(((pointA, pointB) => getDifference(pointA.dateFrom, pointB.dateFrom)))
    .forEach((point) => renderPoint(pageEventListElement, point));
};

const tripPoints = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(generatePoint);

renderTrip(tripPoints);
