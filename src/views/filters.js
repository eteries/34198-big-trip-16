const FILTERS = [
  'everything',
  'future',
  'past',
];

const activeFilter = FILTERS[0];

const createFiltersListTemplate = () => (
  FILTERS
    .map((name) => (
      `<div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${activeFilter === name ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-everything">${name}</label>
      </div>`
    ))
    .join('')
);

export const createFiltersTemplate = () => {
  const filtersListTemplate = createFiltersListTemplate();

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersListTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
};
