import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const pointDate = (dueDate) => dayjs(dueDate).format('MMM D');
const pointTime = (dueDate) => dayjs(dueDate).format('HH:MM');

export {getRandomInteger, pointDate, pointTime};
