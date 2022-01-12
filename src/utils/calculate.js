import { Sortings } from '../constants';
import { getDuration, getUnixNum } from './date';

const calculateCost = (points) => points.reduce((sum, current) => sum + current.basePrice, 0);

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

export { calculateCost, getUniqueDestinations, calculateTripStart, calculateTripEnd, getOffersByType, sortTripPoints };
