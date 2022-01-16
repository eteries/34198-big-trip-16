import { calculateCost, calculateTripEnd, calculateTripStart, getUniqueDestinations, sortTripPoints } from '../utils/calculate';
import { Positions, render } from '../utils/dom';
import EmptyView from '../views/empty';
import HeaderView from '../views/header';
import RouteView from '../views/route';
import CostView from '../views/cost';
import SortingView from '../views/sorting';
import PointsView from '../views/points';
import LoadingView from '../views/loading';
import NewButtonView from '../views/new-button';
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
  #costComponent;

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

    if (!this.#costComponent) {
      this.#costComponent = new CostView(cost);
      render(this.#headerComponent, this.#costComponent, Positions.BEFORE_END);
      return;
    }

    const prevElement = this.#costComponent.element;
    this.#costComponent.removeElement();
    this.#costComponent = new CostView(cost);
    prevElement.replaceWith(this.#costComponent.element);
  }

  #renderSorting = (sortingType) => {
    const sorting = new SortingView(sortingType);
    sorting.setSortingChangeHandler(this.#onSortingChange);
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
    this.#renderPointsList();

    this.#renderLoading();
  }

  #updatePoints = (updatedPoint) => {
    this.#points = updateItem(updatedPoint, this.#points);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
    this.#renderCost();
  }

  #sortPoints = (sortType) => {
    if (sortType === this.#activeSorting) {
      return;
    }

    this.#points = sortTripPoints(this.#points, sortType);
    this.#activeSorting = sortType;
  }

  #resetPointsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #clearPointsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #onSortingChange = (evt) => {
    this.#sortPoints(evt.target.dataset.key);
    this.#clearPointsList();
    this.#renderPointsList();
  }
}
