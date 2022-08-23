import { createElement } from '../render.js';
import {pointDate, pointTime} from '../utils.js'

const createPointemplate = (point) => {
  const {type, basePrice, dateFrom, dateTo} = point;
  console.log(point);
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-19">${pointDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Flight Geneva</h3>
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
          <li class="event__offer">
            <span class="event__offer-title">Add luggage</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">30</span>
          </li>
          <li class="event__offer">
            <span class="event__offer-title">Switch to comfort</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">100</span>
          </li>
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li;>`
  );
};


export default class PointView {
  constructor (point) {
    this.point = point;
  }

  getTemplate() {
    return createPointemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
