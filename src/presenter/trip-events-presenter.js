import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsBoardView from '../view/points-board-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddPointView from '../view/add-point-view';
import PointView from '../view/point-view';
import NoPointsView from '../view/no-points-view';

export default class TripEventsPresenter {

  #pointsModel = null;
  #container = null;
  #pointList = null;

  #sort = new SortView();
  #pointsBoard = new PointsBoardView();
  #noPoints = new NoPointsView();

  constructor (container, pointsModel) {
    this.#pointsModel = pointsModel;
    this.#container = container;
    this.#pointList = this.#pointsModel.points;
  }

  init = () => {

    if (this.#pointList.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsBoard();
    this.#renderAddPoint();

    for (const point of this.#pointList) {
      const pointComponent = new PointView(point, this.#pointsModel.getOffers(point), this.#pointsModel.getDestination(point));

      const newEditPointComponent = () => {
        const editPointComponent = new EditPointView(point, this.#pointsModel.getOffers(point), this.#pointsModel.getDestination(point),this.#pointsModel.destinationList);

        const replaceEditFormToCard = () => {
          this.#pointsBoard.element.replaceChild(pointComponent.element, editPointComponent.element);
        };

        const onEscKeyDown = (evt) => {
          if (evt.key === 'Escape' || evt.key === 'Esc') {
            replaceEditFormToCard();
            document.removeEventListener('keydown', onEscKeyDown);
          }
        };

        editPointComponent.addEditButtonClickHandler(replaceEditFormToCard);
        document.addEventListener('keydown', onEscKeyDown);
        return editPointComponent;
      };

      pointComponent.addEditButtonClickHandler(() => {
        const editPointComponent = newEditPointComponent();
        this.#pointsBoard.element.replaceChild(editPointComponent.element, pointComponent.element);
      });

      render(pointComponent, this.#pointsBoard.element);
    }
  };


  #renderSort = () => {
    render(this.#sort, this.#container);
  };

  #renderNoPoints = () => {
    render(this.#noPoints, this.#container);
  };

  #renderPointsBoard = () => {
    render(this.#pointsBoard, this.#sort.element, RenderPosition.AFTEREND);
  };

  #renderAddPoint = () => {
    const addPoint = new AddPointView(this.#pointsModel.destinationList);
    render(addPoint, this.#pointsBoard.element);
  };


}
