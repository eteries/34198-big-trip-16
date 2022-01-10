import { Sortings } from '../constants';
import AbstractView from './abstract-view';

const createSortingListTemplate = (activeSorting) => (
  Object.values(Sortings)
    .map((name) => {
      const checked = name === activeSorting ? 'checked': '';
      const disabled = (name === Sortings.Event || name === Sortings.Offer) ? 'disabled' : '';

      return (
        `<div class="trip-sort__item  trip-sort__item--${name}">
          <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${checked} ${disabled} data-key="${name}">
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

export default class Sorting extends AbstractView {
  #activeSorting;

  constructor(activeSorting) {
    super();
    this.#activeSorting = activeSorting;
  }

  get template() {
    return createSortingTemplate(this.#activeSorting);
  }

  setSortingChangeHandler(cb) {
    this._handlers.onSortingChange = cb;
    this.element.addEventListener('change', this._handlers.onSortingChange);
  }
}
