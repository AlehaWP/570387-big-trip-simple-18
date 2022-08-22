import {render, RenderPosition} from '../render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddPointView from '../view/add-point-view';
import PointView from '../view/point-view';

export default class TripEventsPresenter {
  pointCount = 2;
  sort = new SortView();
  pointList = new PointListView();

  init = (container, pointsModel) => {
    this.container = container;
    this.pointsBorder = [...pointsModel.getPoints()];
    render(this.sort, this.container);
    render(this.pointList, this.sort.getElement(), RenderPosition.AFTEREND);
    render(new EditPointView(), this.pointList.getElement());
    render(new AddPointView(), this.pointList.getElement());

    for (const point of this.pointsBorder) {
      render(new PointView(point), this.pointList.getElement());
    }
  };
}
