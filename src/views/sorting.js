import { SORTINGS } from '../constants';
import { createElement } from '../utils/dom';

const createSortingListTemplate = (activeSorting) => (
  SORTINGS
    .map((name) => {
      const checked = name === activeSorting ? 'checked': '';
      const disabled = (name === SORTINGS[1] || name === SORTINGS[4]) ? 'disabled' : '';

      return (
        `<div class="trip-sort__item  trip-sort__item--${name}">
          <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${checked} ${disabled}>
          <label class="trip-sort__btn" for="sort-${name}">${name}</label>
        </div>`
      );
    })
    .join('')
);

const createSortingTemplate = (activeSorting) => {
  const sortingListTemplate = createSortingListTemplate(activeSorting);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingListTemplate}
    </form>`
  );
};

export default class Sorting {
  #element = null;
  #activeSorting = SORTINGS[3];

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSortingTemplate(this.#activeSorting);
  }

  removeElement() {
    this.#element = null;
  }
}
