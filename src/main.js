import HeaderView from './views/header.js';
import RouteView from './views/route.js';
import CostView from './views/cost.js';
import StatisticsView from './views/statistics.js';
import LoadingView from './views/loading.js';
import PointsView from './views/points.js';
import PointView from './views/point.js';
import PointEditView from './views/point-edit.js';
import NavigationView from './views/navigation.js';
import FiltersView from './views/filters.js';
import SortingView from './views/sorting.js';
import EmptyView from './views/empty';

import { generatePoint } from './mocks/point';
import { isEscape, Positions, render } from './utils/dom';
import { getDifference } from './utils/date';
import { calculateCost, calculateTripEnd, calculateTripStart, getUniqueDestinations } from './utils/calculate';
import { Filters, RENDERED_EVENTS_NUMBER } from './constants';

const renderPoint = (container, point) => {

};

const renderTrip = (points) => {

};

const tripPoints = new Array(RENDERED_EVENTS_NUMBER)
  .fill(null)
  .map(generatePoint);

renderTrip(tripPoints);
