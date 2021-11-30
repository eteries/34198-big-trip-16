import { SORTINGS } from '../constants';

const activeSorting = SORTINGS[3];

const createSortingListTemplate = () => (
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

export const createSortingTemplate = () => {
  const sortingListTemplate = createSortingListTemplate();
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingListTemplate}
    </form>`
  );
};
