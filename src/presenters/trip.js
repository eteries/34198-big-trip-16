import { calculateCost, calculateTripEnd, calculateTripStart, getUniqueDestinations } from '../utils/calculate';
import { Positions, render } from '../utils/dom';
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
  #controlsElement;
  #pointsElement;
  #pointsListComponent;
  #headerComponent;
  #activeFilter;
  #pointPresenters;

  constructor(points, activeFilter) {
    this.#points = points;
    this.#activeFilter = activeFilter;
    this.#pointPresenters = {};
  }

  init(controlsContainer, pointsContainer) {
    this.#controlsElement = controlsContainer;
    this.#pointsElement = pointsContainer;

    if (!this.#points.length) {
      this.#renderEmptyTrip();
      return;
    }

    this.#renderContent();
  }

  #updatePoint = (updatedPoint, points) => {
    const index = points.findIndex(({id}) => id === updatedPoint.id);
    return [points.slice(0, index - 1), updatedPoint, points.slice(index + 1, points.length - 1)];
  }

  #toggleFavorites = (updatedPoint) => {
    this.#updatePoint(updatedPoint, this.#points);
    this.#pointPresenters[updatedPoint.id].init(updatedPoint);
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
    this.#pointsListComponent = new PointsView();
    render(this.#pointsElement, this.#pointsListComponent, Positions.BEFORE_END);
  }

  #renderContent = () => {
    this.#renderHeader();
    this.#renderRoute();
    this.#renderCost();
    this.#renderSorting();
    this.#renderPointsList();
    this.#renderLoading();
    this.#renderNewButton();

    this.#points
      .sort(((pointA, pointB) => getDifference(pointA.dateFrom, pointB.dateFrom)))
      .forEach((point) => {
        const pointPresenter = new Point(this.#pointsListComponent, this.#toggleFavorites);
        pointPresenter.init(point);
        this.#pointPresenters[point.id] = pointPresenter;
      });
  }
}
