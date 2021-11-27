import { generateDestination } from './destination.js';
import { offer } from './offer.js';
import {
  getRandomArrayElement,
  getRandomInt,
  getRandomSubArray,
  getUniqueRandomInt
} from '../utils/random.js';
import { POINT_TYPES } from '../constants';

const EventPrice = {
  MIN: 50,
  MAX: 1500,
};

const IDRange = {
  MIN: 1,
  MAX: 9999,
};

export function generateTripEvent() {
  return {
    basePrice: getRandomInt(EventPrice.MIN, EventPrice.MAX),
    dateFrom: null,
    dateTo: null,
    destination: generateDestination(),
    isFavorite: Boolean(getRandomInt(0,1)),
    id: getUniqueRandomInt(IDRange.MIN, IDRange.MAX)(),
    offers: getRandomSubArray(offer.offers),
    type: getRandomArrayElement(POINT_TYPES),
  };
}
