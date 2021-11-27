import { getRandomSubPhrase } from '../utils/random.js';
import { MOCK_TEXT } from './text.js';

const CITIES = [
  'Geneva',
  'Chamonix',
  'Amsterdam',
];

function generateDestination (city) {
  return {
    name: city,
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

export const destinations =  CITIES.map((city) => generateDestination(city));
