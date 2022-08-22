import { generatePoint } from '../mock/point.js';

const POINT_COUNT = 20;

export default class PointsModel {
  points = Array.from({length:POINT_COUNT}, generatePoint);

  getPoints = () => this.points;

}
