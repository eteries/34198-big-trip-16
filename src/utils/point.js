import { IDRange, POINT_TYPES } from '../constants';
import { getToday } from './date';
import { destinations } from '../mocks/destinations';
import { getUniqueRandomInt } from './random';

const convertPointToState = (point) => ({
  ...point,
  id: point.id ?? getUniqueRandomInt(IDRange.MIN, IDRange.MAX)(),
  isFavorite: point.isFavorite ?? false,
  type: point.type ?? POINT_TYPES[0],
  dateFrom: point.dateFrom ?? getToday(),
  dateTo: point.dateTo ?? getToday(),
  basePrice: point.basePrice ?? 0,
  offers: point.offers ?? [],
  destination: point.destination ?? destinations[0],
});

const convertStateToPoint = (state) => ({...state});

export { convertPointToState, convertStateToPoint };
