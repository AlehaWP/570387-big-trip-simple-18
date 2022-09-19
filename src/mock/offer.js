import { getRandomInteger, randomElement } from '../utils.js';
import {POINT_TYPES} from '../const.js';

const randomTitle = () => {
  const titles = [
    'Upgrade to a business class',
    'Add luggage',
    'Switch to comfort class',
    'Choose seats',
    'Add meal',
    'Travel by train'
  ];
  return randomElement(titles);
};

const getRandomType = () => randomElement(POINT_TYPES);

export const generateOffer = (id) => ({
  id,
  title: randomTitle(),
  type: getRandomType(),
  price: getRandomInteger(50, 500)
});


