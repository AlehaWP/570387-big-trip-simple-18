import AbstractView from '../framework/view/abstract-view.js';
import { SortTypes } from '../const.js';


const createSortItemTemplate = () => SortTypes.map((sortType, index) => (
  `<div class="trip-sort__item  trip-sort__item--${sortType}">
    <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${index === 0 ? 'checked' : ''} ${sortType === 'price' || sortType === 'day' ? '' : 'disabled'}>
    <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
  </div>`
)).join('');

const createSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createSortItemTemplate()}
</form>`;


export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
