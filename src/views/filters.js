import { Filters as FilterNames } from '../constants';
import AbstractView from './abstract-view';

const createFiltersListTemplate = (activeFilter) => (
  Object.values(FilterNames)
    .map((name) => (
      `<div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${activeFilter === name ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`
    ))
    .join('')
);

const createFiltersTemplate = (activeFilter) => {
  const filtersListTemplate = createFiltersListTemplate(activeFilter);

  return (
    `<div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filtersListTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
     </div>`
  );
};

export default class Filters extends AbstractView {
  constructor(activeFilter) {
    super();
    this.activeFilter = activeFilter;
  }

  get template() {
    return createFiltersTemplate(this.activeFilter);
  }

  setFilterChangeHandler = (callback) => {
    this._handlers.filterTypeChange = callback;
    this.element.addEventListener('change', (evt)=> this._handlers.filterTypeChange(evt.target.value));
  }
}
