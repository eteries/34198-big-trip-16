import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import flatpickr from 'flatpickr';

dayjs.extend(duration);

const getDuration = (dateFrom, dateTo) => dayjs(dateTo).diff(dateFrom);

const formatDate = (date, format) => dayjs(date).format(format);

const formatPointDuration = (pointDuration) => {
  const parsedDuration = dayjs.duration(pointDuration);
  const durationElements = [
    ['D', parsedDuration.days()],
    ['H', parsedDuration.hours()],
    ['M', parsedDuration.minutes()],
  ];

  return durationElements
    .reduce((acc, [label, value]) => {
      if (value) {
        acc.push(`${value}${label}`);
      }
      return acc;
    }, [])
    .join(' ');
};

const formatTripDuration = (dateFrom , dateTo) => {
  const Format = {
    Years: `${formatDate(dateFrom, 'DD MMM YYYY')} - ${formatDate(dateTo, 'DD MMM YYYY')}`,
    Month: `${formatDate(dateFrom, 'MMM DD')} - ${formatDate(dateTo, 'MMM DD')}`,
    Days: `${formatDate(dateFrom, 'MMM DD')} - ${formatDate(dateTo, 'DD')}`,
  };

  if (dayjs(dateFrom).year() !== dayjs(dateTo).year()) {
    return Format.Years;
  }

  if (dayjs(dateFrom).month() !== dayjs(dateTo).month()) {
    return Format.Month;
  }

  return Format.Days;
};

const addTimeInterval = (date, interval, unit) => dayjs(date).add(interval, unit).toISOString();

const subtractTimeInterval = (date, interval, unit) => dayjs(date).subtract(interval, unit).toISOString();

const getDifference = (firstDate, secondDate) => dayjs(firstDate).diff(secondDate);

const getToday = () => dayjs().startOf('date').toISOString();

const getUnixNum = (date) => dayjs(date).unix();

const setDateTimePicker = ({element, defaultDate, onChange}) => (
  flatpickr(
    element,
    {
      enableTime: true,
      dateFormat: 'd/m/Y H:i',
      defaultDate,
      onChange
    }
  )
);

export { getDuration, formatPointDuration, formatDate, addTimeInterval, subtractTimeInterval, getDifference, getToday, formatTripDuration, getUnixNum, setDateTimePicker };
