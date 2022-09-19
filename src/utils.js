import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const randomElement = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);
  return arr[randomIndex];
};

const pointDate = (dueDate) => dayjs(dueDate).format('MMM D');
const editPointDateTime = (dueDate) => dayjs(dueDate).format('DD/MM/YYYY HH:MM');
const pointTime = (dueDate) => dayjs(dueDate).format('HH:MM');


const getDestinationById = (id, destinationsList) => destinationsList.find((item) => item.id === id);

const getOffersByType = (type, offersList) => offersList.filter((item) => item.type === type);

export {getRandomInteger, pointDate, pointTime, editPointDateTime, randomElement, getDestinationById, getOffersByType};
