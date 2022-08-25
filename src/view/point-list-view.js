import { createElement } from '../render.js';

const createPointListTemplate = () => '<ul class="trip-events__list"></ul>';


export default class PointListView {
  #element = null;
  #getTemplate() {
    return createPointListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
    }

    return this.#element;
  }
}
