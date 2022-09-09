import {getRandomInteger, randomElement } from '../utils.js';
import {POINT_TYPES, POINT_COUNT} from '../const.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';


const getRandomType = () => randomElement(POINT_TYPES);

const generateDate = (dateStart = '') => {
  const dateFrom = (dateStart) ?
    dayjs(dateStart) :
    dayjs();
  const randomDayPeriod = getRandomInteger(0, 30);
  const randomHourPeriod = getRandomInteger(0, 12);
  return dateFrom.add(randomDayPeriod, 'day').add(randomHourPeriod, 'hour').toISOString();
};


const offers = {
  maxOffers: POINT_COUNT,
  generateRandomID() {
    return getRandomInteger(1, this.maxOffers);
  },
  generate() {
    return [...new Set(Array.from({length: getRandomInteger(0, this.maxOffers)}, this.generateRandomID, this))];
  }
};


export const generatePoint = () => {
  const startDate = generateDate();
  return {
    id: nanoid(),
    basePrice: getRandomInteger(500, 5000),
    type: getRandomType(),
    dateFrom: startDate,
    dateTo: generateDate(startDate),
    offers: offers.generate(),
    destination: getRandomInteger(1, POINT_COUNT)
  };
};
