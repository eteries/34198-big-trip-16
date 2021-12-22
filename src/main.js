import { generatePoint } from './mocks/point';
import { Filters, RENDERED_EVENTS_NUMBER } from './constants';
import Trip from './presenters/trip';
import { Positions, render } from './utils/dom';
import NavigationView from './views/navigation';
import FiltersView from './views/filters';
import StatisticsView from './views/statistics';

const tripControlsElement = document.querySelector('.trip-controls');
const tripEventsElement = document.querySelector('.trip-events');
const activeFilter = Filters.Everything;

render(tripControlsElement, new NavigationView(), Positions.BEFORE_END);
render(tripControlsElement, new FiltersView(activeFilter), Positions.BEFORE_END);
render(tripEventsElement, new StatisticsView(), Positions.AFTER_END);

const tripPoints = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(generatePoint);

new Trip(tripPoints, activeFilter)
  .init(tripControlsElement, tripEventsElement);
