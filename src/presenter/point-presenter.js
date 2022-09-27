import { render, replace, remove} from '../framework/render.js';

import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view';


export default class PointPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #pointComponent = null;
  #editPointComponent = null;
  #resetPointsOnBoard = null;
  #changeData = null;

  constructor(container, pointsModel, changeData, resetPointsOnBoard) {
    this.#pointsContainer = container;
    this.#pointsModel = pointsModel;
    this.#resetPointsOnBoard = resetPointsOnBoard;
    this.#changeData = changeData;
  }

  init(point) {
    const oldPointComponent = this.#pointComponent;
    const oldEditPointComponent = this.#editPointComponent;
    const destinationsList = this.#pointsModel.destinationsList;

    this.#pointComponent = new PointView(point, this.#pointsModel.getOffers(point), destinationsList);
    this.#pointComponent.addEditButtonClickHandler(this.#editButtonHandler);

    this.#editPointComponent = new EditPointView(point, this.#pointsModel.offersList, destinationsList);
    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);

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
    this.#editPointComponent.addRollUpButtonClickHandler(this.#replaceEditFormToCard);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #editButtonHandler = () => {
    this.#resetPointsOnBoard();
    this.#addEventEditPointComponent();
    replace(this.#editPointComponent, this.#pointComponent);
  };

  #renderPoint = () => {
    render(this.#pointComponent, this.#pointsContainer.element);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditFormToCard();
  };

}
