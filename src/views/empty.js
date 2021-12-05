import { Messages, Filters } from '../constants';
import AbstractView from './abstract-view';

const createEmptyTemplate = (activeFilter = Filters.Everything) => (
  `<p class="trip-events__msg">${Messages[activeFilter]}</p>`
);

export default class Empty extends AbstractView {
  constructor(activeFilter) {
    super();
    this.activeFilter = activeFilter;
  }

  get template() {
    return createEmptyTemplate(this.activeFilter);
  }
}
