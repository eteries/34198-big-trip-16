import { getRandomInt } from '../utils/random.js';
import { addTimeInterval, subtractTimeInterval } from '../utils/date';

const StartMinutesRange = {
  MIN: 1,
  MAX: 60 * 24 * 14,
};

const DurationMinutesRange = {
  MIN: 30,
  MAX: 60 *24 * 2,
};

const generateDateFrom = () => {
  const minutesBeforeOrAfter = getRandomInt(0, 1)
    ? addTimeInterval(Date(), getRandomInt(StartMinutesRange.MIN, StartMinutesRange.MAX), 'minute')
    : subtractTimeInterval(Date(), getRandomInt(StartMinutesRange.MIN, StartMinutesRange.MAX), 'minute');

  return minutesBeforeOrAfter;
};

const generateDateTo = (dateFrom) => addTimeInterval(dateFrom, getRandomInt(DurationMinutesRange.MIN, DurationMinutesRange.MAX), 'minute');

export { generateDateFrom, generateDateTo };
