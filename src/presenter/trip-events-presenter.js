import {render, RenderPosition} from '../render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddPointView from '../view/add-point-view';
import PointView from '../view/point-view';

const PointCount = 3;


export default class TripEventsPresenter {
  sort = new SortView();
  pointList = new PointListView();

  init(container) {
    render(this.sort, container);
    render(this.pointList, this.sort.getElement(), RenderPosition.AFTEREND);
    render(new EditPointView(), this.pointList.getElement());
    render(new AddPointView(), this.pointList.getElement());

    for (let i = 0; i <= PointCount; i++) {
      render(new PointView(), this.pointList.getElement());
    }
  }
}
