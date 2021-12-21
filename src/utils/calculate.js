const calculateCost = (points) => points.reduce((sum, current) => sum + current.basePrice, 0);

const getUniqueDestinations = (points) => [...new Set(points.map(({destination = {}}) => destination.name))];

const calculateTripStart = (points) => points
  .map(({dateFrom}) => dateFrom)
  .sort()[0];

const calculateTripEnd = (points) => (
  points
    .map(({dateTo}) => dateTo)
    .sort()
    .reverse()[0]
);

const getOffersByType = (offers, type) => offers
  .filter((offer) => offer.type === type || offer.type === 'mock')[0].offers;

export { calculateCost, getUniqueDestinations, calculateTripStart, calculateTripEnd, getOffersByType };
