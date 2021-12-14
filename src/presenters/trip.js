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
import NewButtonView from '../views/new-button';
import { getDifference } from '../utils/date';
import Point from './point';

export default class Trip {
  #points;
  #controlsElement
  #pointsElement
  #headerComponent;
  #activeFilter = Filters.Everything;

  constructor(points) {
    this.#points = points;
  }

  init(controlsContainer, pointsContainer) {
    this.#controlsElement = controlsContainer;
    this.#pointsElement = pointsContainer;

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
    render(this.#controlsElement, new NavigationView(), Positions.BEFORE_END);
  }

  #renderFilters = () => {
    render(this.#controlsElement, new FiltersView(this.#activeFilter), Positions.BEFORE_END);
  }

  #renderStatistics = () => {
    render(this.#pointsElement, new StatisticsView(), Positions.AFTER_END);
  }

  #renderEmptyTrip = () => {
    render(this.#pointsElement, new EmptyView(this.#activeFilter), Positions.BEFORE_END);
  }

  #renderHeader = () => {
    this.#headerComponent = new HeaderView();
    render(this.#controlsElement, this.#headerComponent, Positions.BEFORE_BEGIN);
  }

  #renderNewButton = () => {
    render(this.#controlsElement, new NewButtonView(), Positions.AFTER_END);
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
    render(this.#pointsElement, new SortingView(), Positions.BEFORE_END);
  }

  #renderLoading = () => {
    render(this.#pointsElement, new LoadingView(), Positions.BEFORE_END);
  }

  #renderPointsList = () => {
    render(this.#pointsElement, new PointsView(), Positions.BEFORE_END);
  }

  #renderContent = () => {
    this.#renderHeader();
    this.#renderRoute();
    this.#renderCost();
    this.#renderSorting();
    this.#renderPointsList();
    this.#renderLoading();
    this.#renderNewButton();

    const pageEventListElement = this.#pointsElement.querySelector('.trip-events__list');
    this.#points
      .sort(((pointA, pointB) => getDifference(pointA.dateFrom, pointB.dateFrom)))
      .forEach((point) => {
        const newPoint = new Point(pageEventListElement, point);
        newPoint.init();
        newPoint.renderPoint();
      });
  }
}
