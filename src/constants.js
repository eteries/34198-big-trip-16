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

export const Sortings = {
  Day: 'day',
  Event: 'event',
  Duration: 'time',
  Price: 'price',
  Offer: 'offer',
};

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

export const IDRange = {
  MIN: 1,
  MAX: 9999,
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  POINT: 'POINT',
  LIST: 'LIST',
  TRIP: 'TRIP',
};
