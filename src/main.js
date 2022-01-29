import { generatePoint } from './mocks/point';
import { Filters, RENDERED_EVENTS_NUMBER } from './constants';
import TripPresenter from './presenters/trip-presenter';
import { Positions, render } from './utils/dom';
import NavigationView from './views/navigation';
import FiltersView from './views/filters';
import StatisticsView from './views/statistics';
import PointsModel from './models/points-model';

const tripControlsElement = document.querySelector('.trip-controls');
const tripEventsElement = document.querySelector('.trip-events');
const activeFilter = Filters.Everything;

render(tripControlsElement, new NavigationView(), Positions.BEFORE_END);
render(tripControlsElement, new FiltersView(activeFilter), Positions.BEFORE_END);
render(tripEventsElement, new StatisticsView(), Positions.AFTER_END);

const tripPoints = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(generatePoint);
const pointsModel = new PointsModel();
pointsModel.points = tripPoints;

new TripPresenter(activeFilter, pointsModel)
  .init(tripControlsElement, tripEventsElement);
