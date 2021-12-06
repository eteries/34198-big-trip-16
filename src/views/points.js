import AbstractView from './abstract-view';

const createPointsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class Points extends AbstractView {
  get template() {
    return createPointsTemplate();
  }
}
