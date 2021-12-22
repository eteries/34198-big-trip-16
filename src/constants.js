export const POINT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

export const TABS = [
  'Table',
  'Stats'
];

export const Filters = {
  Everything: 'everything',
  Future: 'future',
  Past: 'past',
};

export const Messages = {
  [Filters.Everything]: 'Click New Event to create your first point',
  [Filters.Past]: 'There are no past events now',
  [Filters.Future]: 'There are no future events now',
};

export const SORTINGS = [
  'day',
  'event',
  'time',
  'price',
  'offer',
];

export const STATISTICS = [
  'money',
  'type',
  'time',
];

export const RENDERED_EVENTS_NUMBER = 15;

export const Mode = {
  Closed: 'Closed',
  Open: 'Open',
};
