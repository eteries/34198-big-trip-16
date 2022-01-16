import { destinations } from './destinations.js';
import { generateDateFrom, generateDateTo } from './date';
import { offers } from './offers.js';
import { getRandomArrayElement, getRandomInt, getRandomSubArray, getUniqueRandomInt } from '../utils/random.js';
import { IDRange, POINT_TYPES } from '../constants';
import { getOffersByType } from '../utils/calculate';

const EventPrice = {
  MIN: 50,
  MAX: 1000,
};

const generatePoint = () => {
  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo(dateFrom);
  const type = getRandomArrayElement(POINT_TYPES);
  const availableOffers = getOffersByType(offers, type);
  const selectedOffers = availableOffers.length ? getRandomSubArray(availableOffers) : [];

  return {
    basePrice: getRandomInt(EventPrice.MIN, EventPrice.MAX),
    dateFrom,
    dateTo,
    destination: getRandomArrayElement(destinations),
    isFavorite: Boolean(getRandomInt(0,1)),
    id: getUniqueRandomInt(IDRange.MIN, IDRange.MAX)(),
    offers: selectedOffers,
    type,
  };
};

export { generatePoint };
