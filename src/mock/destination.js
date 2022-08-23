import { getRandomInteger, randomElement } from '../utils.js';
import { POINT_COUNT } from '../const.js';

const cities = [
  'Prague',
  'London',
  'Moskow',
  'Berlin',
  'Bejong',
  'New York',
  'Madrid',
  'Rome',
];

const randomCity = () => randomElement(cities);


const randomDescription = () => {
  const descriptions = [
    'lorem ipsum dolor sit amet',
    'consectetur adipiscing elit. Cras aliquet varius magna',
    'fusce tristique felis at fermentum pharetra',
    'aliquam id orci ut lectus varius viverra',
    'nullam nunc ex',
    'phasellus eros mauris',
    'aliquam erat volutpat',
    'nunc fermentum tortor ac porta dapibus'
  ];
  return randomElement(descriptions);
};

export const getDestinations = () => cities;

export const generateDestination = (id) => {
  const name = randomCity();
  const description = ''.concat(name, ', ', randomDescription());
  return {
    id,
    description,
    name,
    pictures: {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, POINT_COUNT)}`,
      description
    },
  };
};

