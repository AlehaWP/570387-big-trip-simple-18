import AbstractView from '../framework/view/abstract-view.js';

const createPointsBoardTemplate = () => '<ul class="trip-events__list"></ul>';


export default class PointsBoardView extends AbstractView {

  get template() {
    return createPointsBoardTemplate();
  }
}
