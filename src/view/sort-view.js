import AbstractView from '../framework/view/abstract-view.js';
import { SortTypes } from '../const.js';

const createSortItemTemplate = () => Object.entries(SortTypes).map(([key, value]) => {
  const isChecked = value === SortTypes.DAY ? 'checked' : '';
  const isDisabled = value !== '' ? '' : 'disabled';
  const dataAttribute = value === '' ? '' : `data-sort-type="${value}"`;
  const keyLowerCase = key.toLowerCase();
  return `<div class="trip-sort__item  trip-sort__item--${keyLowerCase}">
    <input id="sort-${keyLowerCase}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${keyLowerCase}" ${isChecked} ${isDisabled} ${dataAttribute}>
    <label class="trip-sort__btn" for="sort-${keyLowerCase}">${key}</label>
  </div>`;
}).join('');

const createSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createSortItemTemplate()}
</form>`;


export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
