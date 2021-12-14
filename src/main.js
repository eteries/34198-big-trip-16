import { generatePoint } from './mocks/point';
import { RENDERED_EVENTS_NUMBER } from './constants';
import Trip from './presenters/trip';

const tripControlsElement = document.querySelector('.trip-controls');
const tripEventsElement = document.querySelector('.trip-events');

const tripPoints = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(generatePoint);

new Trip(tripPoints).init(tripControlsElement, tripEventsElement);
