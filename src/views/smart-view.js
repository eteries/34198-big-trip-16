import AbstractView from './abstract-view';

export default class SmartView extends AbstractView {
  _state;

  updateState = (update) => (
    this._state = {
      ...this._state,
      ...update
    });

  updateElement = () => {
    const prevElement = this.element;
    const parentElement = prevElement.parentElement;
    this.removeElement();
    parentElement.replaceChild(this.element, prevElement);
    this._restoreHandlers();
  };

  _restoreHandlers = () => {
    throw new Error('The restoreHandlers method hasn\'t implemented');
  }

}
