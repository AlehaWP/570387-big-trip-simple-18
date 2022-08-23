import { getRandomInteger, randomElement } from '../utils.js';

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

export const generateOffer = (id) => ({
  id,
  title: randomTitle(),
  price: getRandomInteger(50, 500)
});


