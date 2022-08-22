import {getRandomInteger} from '../utils.js';


const generateType = () => {
  const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generatePoint = () => ({
  id: getRandomInteger(),
  type: generateType(),

});

export {generatePoint};

// {
//   'base_price': 1100,
//   'date_from': '2019-07-10T22:55:56.845Z',
//   'date_to': '2019-07-11T11:22:13.375Z',
//   'destination': $Destination.id$,
//   'id': '0',
//   'offers': $Array<Offer.id>$,
//   'type': 'bus'
// }
