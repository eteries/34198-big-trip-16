import { getRandomArrayElement, getRandomSubPhrase } from '../utils/random.js';
import { MOCK_TEXT } from './text.js';

const CITIES = [
  'Geneva',
  'Chamonix',
  'Amsterdam',
];

export function generateDestination () {
  return {
    name: getRandomArrayElement(CITIES),
    description: getRandomSubPhrase(MOCK_TEXT),
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: getRandomSubPhrase(MOCK_TEXT),
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: getRandomSubPhrase(MOCK_TEXT),
      },
    ],
  };
}
