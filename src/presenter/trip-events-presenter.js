import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsBoardView from '../view/points-board-view.js';
import AddPointView from '../view/add-point-view';
import NoPointsView from '../view/no-points-view';
import PointPresenter from './point-presenter.js';
import {updatePoint, sortWayPointDay, sortWayPointPrice} from '../utils.js';
import { SortTypes } from '../const.js';

export default class TripEventsPresenter {

  #pointsModel = null;
  #container = null;
  #pointList = [];

  #sort = new SortView();
  #pointsBoard = new PointsBoardView();
  #noPoints = new NoPointsView();
  #pointsPresenter = new Map();

  #currentSortType = SortTypes.DAY;

  constructor (container, pointsModel) {
    this.#pointsModel = pointsModel;
    this.#container = container;
    this.#sortWayPoints(this.#currentSortType);
  }

  init = () => {
    this.#pointList = this.#pointsModel.points;
    this.#renderSort();
    this.#renderPointsBoard();
    this.#renderAddPoint();

    this.#renderPoints();


  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsBoard, this.#pointsModel, this.#handleWayPointChange, this.#resetPointsOnBoard);
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {

    if (this.#pointList.length === 0) {
      this.#renderNoPoints();
      return;
    }

    for (const point of this.#pointList) {
      this.#renderPoint(point);
    }
  };

  #resetPointsOnBoard = () => {
    this.#pointsPresenter.forEach((pointPresenter) => {
      pointPresenter.reset();
    });
  };


  #renderSort = () => {
    render(this.#sort, this.#container);
    this.#sort.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoPoints = () => {
    render(this.#noPoints, this.#container);
  };

  #renderPointsBoard = () => {
    render(this.#pointsBoard, this.#sort.element, RenderPosition.AFTEREND);
  };

  #renderAddPoint = () => {
    const addPoint = new AddPointView(this.#pointsModel.offersList, this.#pointsModel.destinationsList);
    render(addPoint, this.#pointsBoard.element);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortWayPoints(sortType);
    this.#resetPointsOnBoard();
    this.#renderPoints();
  };


  #handleWayPointChange = (updatedPoint) => {
    this.#pointList = updatePoint(this.#pointList, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortWayPoints = (sortType) => {
    switch (sortType) {
      case SortTypes.DAY:
        this.#pointList.sort(sortWayPointDay);
        break;
      case SortTypes.PRICE:
        this.#pointList.sort(sortWayPointPrice);
        break;
    }
    this.#currentSortType = sortType;
  };

}
