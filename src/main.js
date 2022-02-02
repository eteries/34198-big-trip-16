import { generatePoint } from './mocks/point';
import { RENDERED_EVENTS_NUMBER } from './constants';
import TripPresenter from './presenters/trip-presenter';
import { Positions, remove, render } from './utils/dom';
import StatisticsView from './views/statistics';
import PointsModel from './models/points-model';
import FiltersPresenter from './presenters/filters-presenter';
import FiltersModel from './models/filters-model';
import HeaderPresenter from './presenters/header-presenter';

const tripControlsElement = document.querySelector('.trip-controls');
const tripEventsElement = document.querySelector('.trip-events');


const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
const filtersPresenter = new FiltersPresenter(tripControlsElement, filtersModel, pointsModel);
filtersPresenter.init();

const tripPoints = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(generatePoint);
pointsModel.points = tripPoints;

const tripPresenter = new TripPresenter(tripControlsElement, tripEventsElement, pointsModel, filtersModel);
tripPresenter.init();

const statistics = new StatisticsView();

const onNavigationClick = (item) => {
  if (item === 'Stats') {
    tripPresenter.destroy();
    filtersPresenter.destroy();
    render(tripEventsElement, statistics, Positions.AFTER_END);
    statistics.init();
    return;
  }

  remove(statistics);
  tripPresenter.init();
  filtersPresenter.init();
};

const headerPresenter = new HeaderPresenter(tripControlsElement, pointsModel, onNavigationClick);
headerPresenter.init();
