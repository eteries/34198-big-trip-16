import AbstractView from './abstract-view';

const createHeaderTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class Header extends AbstractView {
  get template() {
    return createHeaderTemplate();
  }
}
