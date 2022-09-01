import AbstractView from '../framework/view/abstract-view.js';
import {editPointDateTime} from '../utils.js';
import { POINT_TYPES } from '../const.js';

const createTypeListTemplate = (id) => POINT_TYPES.map((type) =>
  `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
   </div>`
).join('');

const createDestinationListTemplate = (destinationList) => destinationList.map((destination) => `<option value="${destination}"></option> `).join('');

const createOffersList = (offers, id) => offers.map((offer) =>
  `<div class="event__offer-selector">
     <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-${id}" type="checkbox" name="event-offer-seats">
     <label class="event__offer-label" for="event-offer-seats-${id}">
       <span class="event__offer-title">${offer.title}</span>
       &plus;&euro;&nbsp;
       <span class="event__offer-price">${offer.price}</span>
     </label>
   </div>`
).join('');

const createEditPointemplate = (point, offers, destination, destinationList) => {
  const {id, type, basePrice, dateFrom, dateTo} = point;
  const {name, description} = destination;
  return ` <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTypeListTemplate(id)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${createDestinationListTemplate(destinationList)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${editPointDateTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${editPointDateTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${createOffersList(offers, id)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
          </section>
        </section>
      </form>
    </li>`;
};


export default class EditPointView extends AbstractView {

  constructor (point, offers, destination, destinationList) {
    super();
    this.point = point;
    this.offers = offers;
    this.destination = destination;
    this.destinationList = destinationList;
  }

  get template() {
    return createEditPointemplate(this.point, this.offers, this.destination, this.destinationList);
  }


  addEditButtonClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener ('click', this.#editButtonClickHandler);
  };

  #editButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
