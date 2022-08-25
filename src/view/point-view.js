import { createElement } from '../render.js';
import {pointDate, pointTime} from '../utils.js';

const createOffersList = (offers) => {
  let result = '';
  for (const offer of offers) {
    result += `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>    
    `;
  }
  return result;
};

const createPointTemplate = (point, offers, destination) => {
  const {type, basePrice, dateFrom, dateTo} = point;
  const {name} = destination;
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-19">${pointDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-19T18:00">${pointTime(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-19T19:00">${pointTime(dateTo)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersList(offers)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li;>`
  );
};


export default class PointView {
  #element = null;
  constructor (point, offers, destination) {
    this.point = point;
    this.offers = offers;
    this.destination = destination;
  }

  #getTemplate() {
    return createPointTemplate(this.point, this.offers, this.destination);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
    }

    return this.#element;
  }
}
