import { destinations } from './destinations.js';
import { generateDateFrom, generateDateTo } from './date';
import { offers } from './offers.js';
import { getRandomArrayElement, getRandomInt, getRandomSubArray, getUniqueRandomInt } from '../utils/random.js';
import { POINT_TYPES } from '../constants';

const EventPrice = {
  MIN: 50,
  MAX: 1000,
};

const IDRange = {
  MIN: 1,
  MAX: 9999,
};

const generatePoint = () => {
  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo(dateFrom);

  return {
    basePrice: getRandomInt(EventPrice.MIN, EventPrice.MAX),
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: getRandomArrayElement(destinations),
    isFavorite: Boolean(getRandomInt(0,1)),
    id: getUniqueRandomInt(IDRange.MIN, IDRange.MAX)(),
    offers: getRandomSubArray(offers[0].offers),
    type: getRandomArrayElement(POINT_TYPES),
  };
};

export { generatePoint };
