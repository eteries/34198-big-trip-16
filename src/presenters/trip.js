import { calculateCost, calculateTripEnd, calculateTripStart, getUniqueDestinations } from '../utils/calculate';
import { Filters } from '../constants';
import { Positions, render } from '../utils/dom';
import NavigationView from '../views/navigation';
import FiltersView from '../views/filters';
import StatisticsView from '../views/statistics';
import EmptyView from '../views/empty';
import HeaderView from '../views/header';
import RouteView from '../views/route';
import CostView from '../views/cost';
import SortingView from '../views/sorting';
import PointsView from '../views/points';
import LoadingView from '../views/loading';
import { getDifference } from '../utils/date';
import Point from './point';

export default class Trip {
  #points;
  #headerComponent;
  #tripMainElement;
  #pageTripEventsElement;
  #activeFilter = Filters.Everything;

  constructor(points) {
    this.#points = points;
  }

  init() {
    this.#tripMainElement = document.querySelector('.trip-main');
    this.#pageTripEventsElement = document.querySelector('.trip-events');

    this.#renderNavigation();
    this.#renderFilters();
    this.#renderStatistics();

    if (!this.#points.length) {
      this.#renderEmptyTrip();
      return;
    }

    this.#renderContent();
  }

  #renderNavigation = () => {
    const navigationElement = this.#tripMainElement.querySelector('.trip-controls__navigation');
    render(navigationElement, new NavigationView(), Positions.BEFORE_END);
  }

  #renderFilters = () => {
    const filtersElement = this.#tripMainElement.querySelector('.trip-controls__filters');
    render(filtersElement, new FiltersView(this.#activeFilter), Positions.BEFORE_END);
  }

  #renderStatistics = () => {
    render(this.#pageTripEventsElement, new StatisticsView(), Positions.AFTER_END);
  }

  #renderEmptyTrip = () => {
    render(this.#pageTripEventsElement, new EmptyView(this.#activeFilter), Positions.BEFORE_END);
  }

  #renderHeader = () => {
    this.#headerComponent = new HeaderView();
    render(this.#tripMainElement, this.#headerComponent, Positions.AFTER_BEGIN);
  }

  #renderRoute = () => {
    const uniqueDestinations = getUniqueDestinations(this.#points);
    const startDate = calculateTripStart(this.#points);
    const endDate = calculateTripEnd(this.#points);
    render(this.#headerComponent, new RouteView(uniqueDestinations, startDate, endDate), Positions.BEFORE_END);
  }

  #renderCost = () => {
    const cost = calculateCost(this.#points);
    render(this.#headerComponent, new CostView(cost), Positions.BEFORE_END);
  }

  #renderSorting = () => {
    render(this.#pageTripEventsElement, new SortingView(), Positions.BEFORE_END);
  }

  #renderLoading = () => {
    render(this.#pageTripEventsElement, new LoadingView(), Positions.BEFORE_END);
  }

  #renderPointsList = () => {
    render(this.#pageTripEventsElement, new PointsView(), Positions.BEFORE_END);
  }

  #renderContent = () => {
    this.#renderHeader();
    this.#renderRoute();
    this.#renderCost();
    this.#renderSorting();
    this.#renderPointsList();
    this.#renderLoading();

    const pageEventListElement = this.#pageTripEventsElement.querySelector('.trip-events__list');
    this.#points
      .sort(((pointA, pointB) => getDifference(pointA.dateFrom, pointB.dateFrom)))
      .forEach((point) => {
        const newPoint = new Point(pageEventListElement, point);
        newPoint.init();
        newPoint.renderPoint();
      });
  }
}
