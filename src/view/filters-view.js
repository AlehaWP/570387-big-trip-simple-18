import AbstractView from '../framework/view/abstract-view.js';


const createFilters = (filters) => filters.map(
  ({name, enabled} ) => (
    `<div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${enabled ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
     </div>`
  )
);

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
    return createFiltersTemplate(this.#filters);
  }
}
