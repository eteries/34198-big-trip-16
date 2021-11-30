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

export { calculateCost, getUniqueDestinations, calculateTripStart, calculateTripEnd};
