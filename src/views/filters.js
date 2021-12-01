import { FILTERS } from '../constants';
import { createElement } from '../utils/render';

const createFiltersListTemplate = (activeFilter) => (
  FILTERS
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
    `<form class="trip-filters" action="#" method="get">
      ${filtersListTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
};

export default class Filters {
  #element = null;
  #activeFilter = FILTERS[0];

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFiltersTemplate(this.#activeFilter);
  }

  removeElement() {
    this.#element = null;
  }
}
