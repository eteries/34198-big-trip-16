import PointView from '../views/point';
import PointEditView from '../views/point-edit';
import { isEscape, Positions, render } from '../utils/dom';

export default class Point {
  constructor(container, point) {
    this._container = container;
    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);
  }

  init() {
    this._pointComponent.setOpenClickHandler(() => {
      this.#openEditor();
      document.addEventListener('keydown', this.#onDocumentKeyDown);
    });

    this._pointEditComponent.setCloseClickHandler(() => {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    });

    this._pointEditComponent.setSubmitHandler(() => {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    });
  }

  renderPoint() {
    render(this._container, this._pointComponent.element, Positions.BEFORE_END);
  }

  #openEditor = () => {
    this._pointComponent.element.replaceWith(this._pointEditComponent.element);
  };

  #closeEditor = () => {
    this._pointEditComponent.element.replaceWith(this._pointComponent.element);
  };

  #onDocumentKeyDown = (evt) => {
    if (isEscape(evt)) {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    }
  };
}
