import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsBoardView from '../view/points-board-view.js';
import AddPointView from '../view/add-point-view';
import NoPointsView from '../view/no-points-view';
import PointPresenter from './point-presenter.js';

export default class TripEventsPresenter {

  #pointsModel = null;
  #container = null;

  #sort = new SortView();
  #pointsBoard = new PointsBoardView();
  #noPoints = new NoPointsView();

  constructor (container, pointsModel) {
    this.#pointsModel = pointsModel;
    this.#container = container;
  }

  init = () => {
    this.#renderSort();
    this.#renderPointsBoard();
    this.#renderAddPoint();

    const pointList = this.#pointsModel.points;

    if (pointList.length === 0) {
      this.#renderNoPoints();
      return;
    }


    for (const point of pointList) {
      const pointPresenter = new PointPresenter(this.#pointsBoard, this.#pointsModel);
      pointPresenter.init(point);
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
