import FiltersView from './view/filters-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import { render } from './render.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageFiltersContainer = pageHeaderElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const pageEventsContainer = pageMainElement.querySelector('.trip-events');

const eventsPresenter = new TripEventsPresenter();

render(new FiltersView(), pageFiltersContainer);

eventsPresenter.init(pageEventsContainer);


