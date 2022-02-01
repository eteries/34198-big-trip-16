import { generatePoint } from './mocks/point';
import { RENDERED_EVENTS_NUMBER } from './constants';
import TripPresenter from './presenters/trip-presenter';
import { Positions, render } from './utils/dom';
import NavigationView from './views/navigation';
import StatisticsView from './views/statistics';
import PointsModel from './models/points-model';
import FiltersPresenter from './presenters/filters-presenter';
import FiltersModel from './models/filters-model';

const tripControlsElement = document.querySelector('.trip-controls');
const tripEventsElement = document.querySelector('.trip-events');

render(tripControlsElement, new NavigationView(), Positions.BEFORE_END);

const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
new FiltersPresenter(tripControlsElement, filtersModel, pointsModel).init();

render(tripEventsElement, new StatisticsView(), Positions.AFTER_END);

const tripPoints = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(generatePoint);
pointsModel.points = tripPoints;

new TripPresenter(pointsModel, filtersModel)
  .init(tripControlsElement, tripEventsElement);
