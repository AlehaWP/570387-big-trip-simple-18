import {render, RenderPosition} from '../render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddPointView from '../view/add-point-view';
import PointView from '../view/point-view';
import NoPointsView from '../view/no-points-view';

export default class TripEventsPresenter {
  #sort = null;
  #pointList = null;
  #pointsModel = null;
  #container = null;
  #pointsBorder = null;

  init = (container, pointsModel) => {
    this.#pointsModel = pointsModel;
    this.#container = container;
    this.#pointsBorder = [];//this.#pointsModel.points;

    if (this.#pointsBorder.length === 0) {
      render(new(NoPointsView), this.#container);
      return;
    }


    this.#sort = new SortView();
    this.#pointList = new PointListView();
    render(this.#sort, this.#container);
    render(this.#pointList, this.#sort.element, RenderPosition.AFTEREND);
    render(new AddPointView(this.#pointsModel.destinationList), this.#pointList.element);


    for (const point of this.#pointsBorder) {
      const pointComponent = new PointView(point, this.#pointsModel.getOffers(point), this.#pointsModel.getDestination(point));
      const pointButton = pointComponent.element.querySelector('.event__rollup-btn');

      const newEditPointComponent = () => {
        const editPointComponent = new EditPointView(point, this.#pointsModel.getOffers(point), this.#pointsModel.getDestination(point),this.#pointsModel.destinationList);
        const btn = editPointComponent.element.querySelector('.event__rollup-btn');

        const replaceEditFormToCard = (evt) => {
          evt.preventDefault();
          this.#pointList.element.replaceChild(pointComponent.element, editPointComponent.element);
        };

        const onEscKeyDown = (evt) => {
          if (evt.key === 'Escape' || evt.key === 'Esc') {
            replaceEditFormToCard(evt);
            document.removeEventListener('keydown', onEscKeyDown);
          }
        };

        btn.addEventListener('click', (evt) => {
          evt.preventDefault(evt);
          this.#pointList.element.replaceChild(pointComponent.element, editPointComponent.element);
          document.removeEventListener('keydown', onEscKeyDown);
        });

        document.addEventListener('keydown', onEscKeyDown);
        return editPointComponent;
      };


      pointButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        const editPointComponent = newEditPointComponent();
        this.#pointList.element.replaceChild(editPointComponent.element, pointComponent.element);
      });

      render(pointComponent, this.#pointList.element);
    }
  };
}
