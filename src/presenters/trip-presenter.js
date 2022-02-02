import { filterTripPoints, sortTripPoints } from '../utils/calculate';
import { Positions, remove, render } from '../utils/dom';
import EmptyView from '../views/empty';
import SortingView from '../views/sorting';
import PointsView from '../views/points';
import LoadingView from '../views/loading';
import NewButtonView from '../views/new-button';
import PointPresenter from './point-presenter';
import { IDRange, Sortings, UpdateType, UserAction } from '../constants';
import { getUniqueRandomInt } from '../utils/random';

export default class TripPresenter {
  #pointsModel;
  #filtersModel;
  #controlsElement;
  #pointsElement;
  #pointsListComponent;
  #activeFilter;
  #pointPresenters;
  #activeSorting;
  #sortingComponent;
  #newButtonComponent;

  constructor(controlsContainer, pointsContainer, pointsModel, filtersModel) {
    this.#controlsElement = controlsContainer;
    this.#pointsElement = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#pointPresenters = new Map();

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    if (!this.points.length) {
      this.#renderEmptyTrip();
      return;
    }

    this.#renderContent();
  }

  get points() {
    const points = this.#pointsModel.points;

    if (this.#activeFilter !== this.#filtersModel.filter) {
      this.#activeSorting = Sortings.Day;
    }

    this.#activeFilter = this.#filtersModel.filter;
    this.#renderSorting(this.#activeSorting);
    const filteredPoints = filterTripPoints(points, this.#activeFilter);
    return sortTripPoints(filteredPoints, this.#activeSorting);
  }

  set points(points) {
    this.#pointsModel.points = points;
  }

  #renderEmptyTrip = () => {
    render(this.#pointsElement, new EmptyView(this.#activeFilter), Positions.BEFORE_END);
  }

  #renderNewButton = () => {
    if (!this.#newButtonComponent) {
      this.#newButtonComponent = new NewButtonView();
      this.#newButtonComponent.setNewButtonClickHandler(this.#addNewPoint);
      render(this.#controlsElement, this.#newButtonComponent, Positions.AFTER_END);
      return;
    }

    const prevElement = this.#newButtonComponent.element;
    this.#newButtonComponent.removeElement();
    this.#newButtonComponent = new NewButtonView();
    this.#newButtonComponent.setNewButtonClickHandler(this.#addNewPoint);
    prevElement.replaceWith(this.#newButtonComponent.element);
  }

  #renderSorting = (sortingType) => {
    if (!this.#sortingComponent) {
      this.#sortingComponent = new SortingView(sortingType);
      this.#sortingComponent.setSortingChangeHandler(this.#onSortingChange);
      render(this.#pointsElement, this.#sortingComponent, Positions.BEFORE_END);
      return;
    }

    const prevElement = this.#sortingComponent.element;
    this.#sortingComponent.removeElement();
    this.#sortingComponent = new SortingView(sortingType);
    this.#sortingComponent.setSortingChangeHandler(this.#onSortingChange);
    prevElement.replaceWith(this.#sortingComponent.element);
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

  #addNewPoint = () => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent, this.#handleViewAction, this.#resetPointsList);
    const newPoint = {id: getUniqueRandomInt(IDRange.MIN, IDRange.MAX)()};
    this.#sortPoints(this.#activeSorting);
    pointPresenter.init(newPoint);
    pointPresenter.openEditor();
    this.#pointPresenters.set(newPoint.id, pointPresenter);
  }

  #renderContent = () => {
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
        this.#rerenderList();
        break;
      case UpdateType.TRIP:
        this.#rerenderList();
        break;
    }
  }

  #rerenderList = () => {
    this.#clearPointsList();
    if (this.points.length > 0) {
      this.#renderPointsList();
      return;
    }
    this.#renderEmptyTrip();
  }

  #sortPoints = (sortType) => {
    if (sortType === this.#activeSorting) {
      return;
    }

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

  destroy = () => {
    this.#clearPointsList();
    remove(this.#sortingComponent);
    this.#sortingComponent = null;
    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filtersModel.removeObserver(this.#handleModelEvent);
  }
}
