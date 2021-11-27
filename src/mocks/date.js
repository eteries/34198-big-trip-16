import dayjs from 'dayjs';
import { getRandomInt } from '../utils/random.js';

const StartMinutesRange = {
  MIN: 1,
  MAX: 60 * 24 * 14,
};

const DurationMinutesRange = {
  MIN: 30,
  MAX: 60 *24 * 2,
};

const generateDateFrom = () => {
  const minuteBeforeOrAfter = getRandomInt(0, 1)
    ? dayjs().add(getRandomInt(StartMinutesRange.MIN, StartMinutesRange.MAX), 'minute')
    : dayjs().subtract(getRandomInt(StartMinutesRange.MIN, StartMinutesRange.MAX), 'minute');

  return minuteBeforeOrAfter.toISOString();
};

const generateDateTo = (dateFrom) => dayjs(dateFrom)
  .add(getRandomInt(DurationMinutesRange.MIN, DurationMinutesRange.MAX), 'minute')
  .toISOString();

export { generateDateFrom, generateDateTo };
