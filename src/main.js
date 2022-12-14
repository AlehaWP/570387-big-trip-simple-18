import FiltersView from './view/filters-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import { render } from './framework/render.js';
import PointsModel from './model/points-model.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageFiltersContainer = pageHeaderElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const pageEventsContainer = pageMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const eventsPresenter = new TripEventsPresenter(pageEventsContainer, pointsModel);

render(new FiltersView(pointsModel.filters), pageFiltersContainer);

eventsPresenter.init();


