import AbstractView from '../framework/view/abstract-view.js';


const createFilters = (filters) => filters.map(
  ({name, enabled}, index ) => (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${ enabled ? '' : 'disabled' } ${index === 0 ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">${name}</label>
     </div>`
  )
).join('');

const createFiltersTemplate = (filters) => (
  `<form class="trip-filters" action="#" method="get">
      ${createFilters (filters)}      
      <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);


export default class FiltersView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    // console.log(this.#filters);
    return createFiltersTemplate(this.#filters);
  }
}
