import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {editPointDateTime, getDestinationById, getOffersByType} from '../utils.js';
import { POINT_TYPES } from '../const.js';

const createTypeListTemplate = (id) => POINT_TYPES.map((type) =>
  `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
   </div>`
).join('');

const createdestinationsListTemplate = (destinationsList) => destinationsList.map((item) => `<option value="${item.name}"></option> `).join('');

const createOffersList = (offers) => offers.map((offer) =>
  `<div class="event__offer-selector">
     <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-${offer.id}" type="checkbox" name="event-offer-seats">
     <label class="event__offer-label" for="event-offer-seats-${offer.id}">
       <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
       <span class="event__offer-price">${offer.price}</span>
     </label>
   </div>`).join('');

const createAddPointTemplate = (point, offersList, destinationsList) => {
  const {id, type, basePrice, dateFrom, dateTo} = point;
  const destination = (point.destination !== 0) ? getDestinationById(point.destination, destinationsList) : {name: ''};

  const {name, description} = destination;
  const offers = getOffersByType(point.type, offersList);
  return`<li class="trip-events__item">
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
              ${createdestinationsListTemplate(destinationsList)}
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
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
              ${offers.length !== 0 ? createOffersList(offers) : ''}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
};

export default class AddPointView extends AbstractStatefulView {

  constructor (offersList, destinationsList) {
    super();
    this._setState({
      id: 0,
      type: 'flight',
      destination: 0
    });
    this.offersList = offersList;
    this.destinationsList = destinationsList;
    this.#setEditFieldsHandlers();
  }

  get template() {
    return createAddPointTemplate(this._state, this.offersList, this.destinationsList);
  }


  _restoreHandlers = () => {
    this.#setEditFieldsHandlers();
  };

  #setEditFieldsHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };


  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value) {
      this.updateElement({
        destination: this.destinationsList.find((item) => item.name === evt.target.value).id,
      });
    }
  };

  static parsePointToState = (point) => ({...point});


  static parseStateToTask = (state) => {
    const point = {...state};

    return point;
  };
}
