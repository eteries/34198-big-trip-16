import PointView from '../views/point';
import PointEditView from '../views/point-edit';
import { isEscape, Positions, render } from '../utils/dom';

export default class Point {
  #container;
  #pointComponent;
  #pointEditComponent;

  constructor(container, point) {
    this.#container = container;
    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point);
  }

  init() {
    this.#pointComponent.setOpenClickHandler(() => {
      this.#openEditor();
      document.addEventListener('keydown', this.#onDocumentKeyDown);
    });

    this.#pointEditComponent.setCloseClickHandler(() => {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    });

    this.#pointEditComponent.setSubmitHandler(() => {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    });

    this.#renderPoint();
  }

  #renderPoint = () => {
    render(this.#container, this.#pointComponent, Positions.BEFORE_END);
  }

  #openEditor = () => {
    this.#pointComponent.element.replaceWith(this.#pointEditComponent.element);
  };

  #closeEditor = () => {
    this.#pointEditComponent.element.replaceWith(this.#pointComponent.element);
  };

  #onDocumentKeyDown = (evt) => {
    if (isEscape(evt)) {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    }
  };
}
