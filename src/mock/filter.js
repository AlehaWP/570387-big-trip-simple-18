import {filter} from '../utils.js';

export const generateFilters = (points) => Object.entries(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    enabled: filterPoints(points).length !== 0,
  })
);

