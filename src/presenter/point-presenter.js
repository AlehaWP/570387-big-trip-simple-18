import { render } from '../framework/render.js';

import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view';


export default class PointPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #pointComponent = null;
  #editPointComponent = null;

  constructor(container, pointsModel) {
    this.#pointsContainer = container;
    this.#pointsModel = pointsModel;
  }

  init(point) {
    this.#pointComponent = new PointView(point, this.#pointsModel.getOffers(point), this.#pointsModel.getDestination(point));
    this.#editPointComponent = new EditPointView(point, this.#pointsModel.getOffers(point), this.#pointsModel.getDestination(point), this.#pointsModel.destinationList);

    this.#renderPoint();
  }

  #replaceEditFormToCard = () => {
    this.#pointsContainer.element.replaceChild(this.#pointComponent.element, this.#editPointComponent.element);
  };


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#replaceEditFormToCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #addEventEditPointComponent = () => {
    this.#editPointComponent.addEditButtonClickHandler(this.#replaceEditFormToCard);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #renderPoint = () => {
    this.#pointComponent.addEditButtonClickHandler(() => {
      this.#addEventEditPointComponent();
      this.#pointsContainer.element.replaceChild(this.#editPointComponent.element, this.#pointComponent.element);
    });

    render(this.#pointComponent, this.#pointsContainer.element);
  };

}
