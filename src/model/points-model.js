import { generateOffer } from '../mock/offer.js';
import { generatePoint } from '../mock/point.js';
import {generateDestination} from '../mock/destination.js';
import {POINT_COUNT} from '../mock/const.js';

export default class PointsModel {
  #points = Array.from({length:POINT_COUNT}, generatePoint);
  #offers = Array.from({length:POINT_COUNT}, (_value, key) => generateOffer(key + 1));
  #destinations = Array.from({length:POINT_COUNT}, (_value, key) => generateDestination(key + 1));

  getPoints = () => this.#points;

  getOffers = (point) => {
    point.offers.map((offerid) => this.#offers.find((offer) => offer.id === offerid));
  };

  getDestination = (point) => this.#destinations.find((destination) => destination.id === point.destination);
  // getDestination = (point) => this.#destinations.find((destination) => destination.id === point.destination);
}
