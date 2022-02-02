import {
  calculateCost,
  calculateTripEnd,
  calculateTripStart,
  getUniqueDestinations,
} from '../utils/calculate';
import { Positions, render } from '../utils/dom';
import HeaderView from '../views/header';
import RouteView from '../views/route';
import CostView from '../views/cost';
import { UpdateType } from '../constants';
import NavigationView from '../views/navigation';

export default class HeaderPresenter {
  #pointsModel;
  #filtersModel;
  #controlsElement;
  #headerComponent;
  #costComponent;
  #routeComponent;
  #tabsComponent;
  #onTabChange;

  constructor(controlsContainer, pointsModel, onTabChange) {
    this.#controlsElement = controlsContainer;
    this.#pointsModel = pointsModel;
    this.#onTabChange = onTabChange;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderContent();
  }

  get points() {
    return this.#pointsModel.points;
  }

  #renderHeader = () => {
    this.#headerComponent = new HeaderView();
    render(this.#controlsElement, this.#headerComponent, Positions.BEFORE_BEGIN);
  }

  #renderRoute = () => {
    const uniqueDestinations = getUniqueDestinations(this.points);
    const startDate = calculateTripStart(this.points);
    const endDate = calculateTripEnd(this.points);

    if (!this.#routeComponent) {
      this.#routeComponent = new RouteView(uniqueDestinations, startDate, endDate);
      render(this.#headerComponent, this.#routeComponent, Positions.BEFORE_END);
      return;
    }

    const prevElement = this.#routeComponent.element;
    this.#routeComponent.removeElement();
    this.#routeComponent = new RouteView(uniqueDestinations, startDate, endDate);
    prevElement.replaceWith(this.#routeComponent.element);
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

  #renderTabs = () => {
    this.#tabsComponent = new NavigationView();
    this.#tabsComponent.setNavigationClickHandler(this.#onTabChange);
    render(this.#controlsElement, this.#tabsComponent, Positions.BEFORE_END);
  }

  #renderContent = () => {
    this.#renderHeader();
    this.#renderRoute();
    this.#renderCost();
    this.#renderTabs();
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.TRIP:
        this.#renderCost();
        this.#renderRoute();
    }
  }

  destroy = () => {
    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filtersModel.removeObserver(this.#handleModelEvent);
  }
}
