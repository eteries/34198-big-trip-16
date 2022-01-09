import { POINT_TYPES } from '../constants';
import { formatDate, getToday } from './date';
import { destinations } from '../mocks/destinations';

const convertPointToState = (point) => {
  const state = {
    type: point.type ?? POINT_TYPES[0],
    dateFrom: point.dateFrom ?? getToday(),
    dateTo: point.dateTo ?? getToday(),
    basePrice: point.basePrice ?? 0,
    offers: point.offers ?? [],
    destination: point.destination ?? destinations[0],
  };

  state.dateFromValue = formatDate(state.dateFrom, 'DD/MM/YY HH:mm');
  state.dateToValue= formatDate(state.dateTo, 'DD/MM/YY HH:mm');

  return state;
};

export { convertPointToState };
