import { Filters, Sortings } from '../constants';
import { getDuration, getUnixNum } from './date';

const calculateCost = (points) => points.reduce((cost, current) => {
  const offersSum = current.offers.reduce((sum, {price}) => sum + price, 0);
  return cost + current.basePrice + offersSum;
}, 0);

const getUniqueDestinations = (points) => [...new Set(points.map(({destination = {}}) => destination.name))];

const calculateTripStart = (points) => points
  .map(({dateFrom}) => dateFrom)
  .sort()[0];

const calculateTripEnd = (points) => (
  points
    .map(({dateTo}) => dateTo)
    .sort()
    .reverse()[0]
);

const getOffersByType = (offers, type) => {
  const filtered = offers.filter((offer) => offer.type === type);
  return filtered.length ? filtered[0].offers : [];
};

const getDestinationByName = (destinations, name) => destinations.find((destination) => destination.name === name);

const sortTripPoints = (points, sortType) => {
  switch (sortType) {
    case Sortings.Day:
      return [...points].sort((pointA, pointB) => getUnixNum(pointA.dateFrom) - getUnixNum(pointB.dateFrom));

    case Sortings.Duration:
      return [...points].sort((pointA, pointB) => (
        getDuration(pointA.dateFrom, pointA.dateTo) - getDuration(pointB.dateFrom, pointB.dateTo
        )));

    case Sortings.Price:
      return [...points].sort(((pointA, pointB) => pointA.basePrice - pointB.basePrice));

    default:
      return points;
  }
};

const filterTripPoints = (points, filterType) => {
  switch (filterType) {
    case Filters.Future:
      return [...points].filter((point) => getUnixNum(point.dateFrom) > getUnixNum(new Date()));

    case Filters.Past:
      return [...points].filter((point) => getUnixNum(point.dateFrom) < getUnixNum(new Date()));

    default:
      return points;
  }
};

export { calculateCost, getUniqueDestinations, calculateTripStart, calculateTripEnd, getOffersByType, sortTripPoints, getDestinationByName, filterTripPoints };
