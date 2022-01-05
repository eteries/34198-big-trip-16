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
import { getDuration, getUnixNum } from '../utils/date';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/common';
import { Sortings } from '../constants';

export default class TripPresenter {
  #points;
  #controlsElement;
  #pointsElement;
  #pointsListComponent;
  #headerComponent;
  #activeFilter;
  #pointPresenters;
  #activeSorting;

  constructor(points, activeFilter) {
    this.#points = points;
    this.#activeFilter = activeFilter;
    this.#pointPresenters = new Map();
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

  #renderSorting = (sortingType) => {
    const sorting = new SortingView(sortingType);
    sorting.setSortingChangeHandler((evt) => {
      this.#renderSortedPoints(evt.target.dataset.key);
    });
    render(this.#pointsElement, sorting, Positions.BEFORE_END);
  }

  #renderLoading = () => {
    render(this.#pointsElement, new LoadingView(), Positions.BEFORE_END);
  }

  #renderPointsListContainer = () => {
    this.#pointsListComponent = new PointsView();
    render(this.#pointsElement, this.#pointsListComponent, Positions.BEFORE_END);
  }

  #renderPointsList= () => {
    this.#points
      .forEach((point) => {
        const pointPresenter = new PointPresenter(this.#pointsListComponent, this.#updatePoints, this.#resetPointsList);
        pointPresenter.init(point);
        this.#pointPresenters.set(point.id, pointPresenter);
      });
  }

  #renderContent = () => {
    this.#renderHeader();
    this.#renderRoute();
    this.#renderCost();
    this.#renderSorting(Sortings.Day);
    this.#renderNewButton();
    this.#renderPointsListContainer();
    this.#sortPoints(Sortings.Day);
    this.#activeSorting = Sortings.Day;
    this.#renderPointsList();

    this.#renderLoading();
  }

  #updatePoints = (updatedPoint) => {
    updateItem(updatedPoint, this.#points);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case Sortings.Day:
        this.#points
          .sort((pointA, pointB) => getUnixNum(pointA.dateFrom) - getUnixNum(pointB.dateFrom));
        return;

      case Sortings.Duration:
        this.#points
          .sort((pointA, pointB) => getDuration(pointA.dateFrom, pointA.dateTo) - getDuration(pointB.dateFrom, pointB.dateTo));
        return;

      case Sortings.Price:
        this.#points
          .sort(((pointA, pointB) => pointA.basePrice - pointB.basePrice));
    }
  }

  #renderSortedPoints = (sortType) => {
    if (sortType === this.#activeSorting) {
      return;
    }

    this.#sortPoints(sortType);
    this.#activeSorting = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  }

  #resetPointsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.reset());
  }

  #clearPointsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
