import FiltersView from '../views/filters';
import { Filters, UpdateType } from '../constants';
import { Positions, remove, render } from '../utils/dom';

export default class FiltersPresenter {
  #container;
  #filtersComponent;
  #filtersModel;
  #pointsModel;

  constructor(container, filtersModel, pointsModel) {
    this.#container = container;
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView(this.#filtersModel.filter);
    this.#filtersComponent.setFilterChangeHandler(this.#handleFilterChange);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);


    if (!prevFiltersComponent) {
      this.#renderFilters();
      return;
    }

    prevFiltersComponent.element.replaceWith(this.#filtersComponent.element);
    remove(prevFiltersComponent);
  }

  destroy() {
    remove(this.#filtersComponent);
    this.#filtersComponent = null;

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filtersModel.removeObserver(this.#handleModelEvent);

    this.#filtersModel.setFilter(UpdateType.TRIP, Filters.Everything);
  }

  #renderFilters = () => {
    render(this.#container, this.#filtersComponent, Positions.BEFORE_END);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.TRIP, filterType);
  };
}
