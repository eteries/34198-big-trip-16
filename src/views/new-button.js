import AbstractView from './abstract-view';

const createNewButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewButton extends AbstractView {
  get template() {
    return createNewButtonTemplate();
  }

  setNewButtonClickHandler (cb) {
    this._handlers.onNewButtonClick = cb;
    this.element.addEventListener('click', this._handlers.onNewButtonClick);
  }
}
