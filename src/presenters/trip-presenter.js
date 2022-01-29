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
import { Sortings, UpdateType, UserAction } from '../constants';

export default class TripPresenter {
  #pointsModel;
  #controlsElement;
  #pointsElement;
  #pointsListComponent;
  #headerComponent;
  #activeFilter;
  #pointPresenters;
  #activeSorting;
  #costComponent;

  constructor(activeFilter, pointsModel) {
    this.#pointsModel = pointsModel;
    this.#activeFilter = activeFilter;
    this.#pointPresenters = new Map();

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init(controlsContainer, pointsContainer) {
    this.#controlsElement = controlsContainer;
    this.#pointsElement = pointsContainer;

    if (!this.points.length) {
      this.#renderEmptyTrip();
      return;
    }

    this.#renderContent();
  }

  get points() {
    return this.#pointsModel.points;
  }

  set points(points) {
    this.#pointsModel.points = points;
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
    const uniqueDestinations = getUniqueDestinations(this.points);
    const startDate = calculateTripStart(this.points);
    const endDate = calculateTripEnd(this.points);
    render(this.#headerComponent, new RouteView(uniqueDestinations, startDate, endDate), Positions.BEFORE_END);
  }

  #renderCost = () => {
    const cost = calculateCost(this.points);

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
    this.points
      .forEach((point) => {
        const pointPresenter = new PointPresenter(this.#pointsListComponent, this.#handleViewAction, this.#resetPointsList);
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

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.POINT:
        this.#pointPresenters.get(point.id).init(point);
        break;
      case UpdateType.LIST:
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      case UpdateType.TRIP:
        this.#clearPointsList();
        this.#renderPointsList();
        this.#renderCost();
        break;
    }
  }

  #sortPoints = (sortType) => {
    if (sortType === this.#activeSorting) {
      return;
    }

    this.points = sortTripPoints(this.points, sortType);
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
