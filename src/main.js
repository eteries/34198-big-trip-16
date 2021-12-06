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
import { isEscape, Positions, renderElement } from './utils/dom';
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

  renderElement(container, pointComponent.element, Positions.BEFORE_END);
};

const renderTrip = (points) => {
  const cost = calculateCost(points);
  const uniqueDestinations = getUniqueDestinations(points);
  const startDate = calculateTripStart(points);
  const endDate = calculateTripEnd(points);
  const activeFilter = Filters.Everything;

  const tripMainElement = document.querySelector('.trip-main');
  const controlsElement = tripMainElement.querySelector('.trip-controls');
  const pageTripEventsElement = document.querySelector('.trip-events');
  renderElement(controlsElement, new NavigationView().element, Positions.BEFORE_END);
  renderElement(controlsElement, new FiltersView(activeFilter).element, Positions.BEFORE_END);
  renderElement(pageTripEventsElement, new StatisticsView().element, Positions.AFTER_END);

  if (!points.length) {
    renderElement(pageTripEventsElement, new EmptyView(activeFilter).element, Positions.BEFORE_END);
    return;
  }

  renderElement(tripMainElement, new HeaderView().element, Positions.AFTER_BEGIN);

  const headerElement = tripMainElement.querySelector('.trip-info');
  renderElement(headerElement, new RouteView(uniqueDestinations, startDate, endDate).element, Positions.BEFORE_END);
  renderElement(headerElement, new CostView(cost).element, Positions.BEFORE_END);
  renderElement(pageTripEventsElement, new SortingView().element, Positions.BEFORE_END);
  renderElement(pageTripEventsElement, new PointsView().element, Positions.BEFORE_END);
  renderElement(pageTripEventsElement, new LoadingView().element, Positions.BEFORE_END);

  const pageEventListElement = pageTripEventsElement.querySelector('.trip-events__list');
  points
    .sort(((pointA, pointB) => getDifference(pointA.dateFrom, pointB.dateFrom)))
    .forEach((point) => renderPoint(pageEventListElement, point));
};

const tripPoints = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(generatePoint);

renderTrip(tripPoints);
