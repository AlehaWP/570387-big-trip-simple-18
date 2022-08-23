import {getRandomInteger} from '../utils.js';
import dayjs from 'dayjs';


const generateType = () => {
  const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateDate = (dateStart = '') => {
  const dateFrom = (dateStart) ?
    dayjs(dateStart) :
    dayjs(); 
  const randomDayPeriod = getRandomInteger(0, 30);
  const randomHourPeriod = getRandomInteger(0, 12);
  return dateFrom.add(randomDayPeriod, 'day').add(randomHourPeriod, 'hour').toISOString();
}


const offers = {
  maxOffers: 3,
  generateRandomID() {
    return getRandomInteger(0, this.maxOffers);
  },
  generate() {
    return [...new Set(Array.from({length: getRandomInteger(0, this.maxOffers)}, this.generateRandomID, this))]
  }
}


export const generatePoint = () => {
  const startDate = generateDate();
  return {
    id: getRandomInteger(1, 20),
    basePrice: getRandomInteger(500, 5000),
    type: generateType(),
    dateFrom: startDate,
    dateTo: generateDate(startDate),
    offers: offers.generate(),
    destination: getRandomInteger(1, 3)
  };
}


// {
//   'base_price': 1100,
//   'date_from': '2019-07-10T22:55:56.845Z',
//   'date_to': '2019-07-11T11:22:13.375Z',
//   'destination': $Destination.id$,
//   'id': '0',
//   'offers': $Array<Offer.id>$,
//   'type': 'bus'
// }
