import { render, replace, remove} from '../framework/render.js';

import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view';


export default class PointPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #pointComponent = null;
  #editPointComponent = null;
  #resetPointsOnBoard = null;

  constructor(container, pointsModel, resetPointsOnBoard) {
    this.#pointsContainer = container;
    this.#pointsModel = pointsModel;
    this.#resetPointsOnBoard = resetPointsOnBoard;
  }

  init(point) {
    const oldPointComponent = this.#pointComponent;
    const oldEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView(point, this.#pointsModel.getOffers(point), this.#pointsModel.getDestination(point));
    this.#editPointComponent = new EditPointView(point, this.#pointsModel.getOffers(point), this.#pointsModel.getDestination(point), this.#pointsModel.destinationList);

    if (oldPointComponent === null || oldEditPointComponent === null) {
      this.#renderPoint();
      return;
    }

    if (this.#pointsContainer.element.contains(oldPointComponent.element)) {
      replace (this.#pointComponent, oldPointComponent);
    }

    if (this.#pointsContainer.element.contains(oldEditPointComponent.element)) {
      replace (this.#editPointComponent, oldEditPointComponent);
    }

    remove (oldPointComponent);
    remove (oldEditPointComponent);
  }

  reset = () => {
    if (this.#pointsContainer.element.contains(this.#editPointComponent.element)) {
      this.#replaceEditFormToCard();
    }
  };

  #replaceEditFormToCard = () => {
    replace(this.#pointComponent, this.#editPointComponent);
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
      this.#resetPointsOnBoard();
      this.#addEventEditPointComponent();
      replace(this.#editPointComponent, this.#pointComponent);
    });

    render(this.#pointComponent, this.#pointsContainer.element);
  };

}
