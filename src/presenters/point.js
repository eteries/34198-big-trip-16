import PointView from '../views/point';
import PointEditView from '../views/point-edit';
import { isEscape, Positions, render } from '../utils/dom';
import { Mode } from '../constants';

export default class Point {
  #container;
  #pointComponent;
  #pointEditComponent;
  #onUpdate;
  #onOpen;
  #point;
  #mode = Mode.Closed;

  constructor(container, onUpdate, onOpen) {
    this.#container = container;
    this.#onUpdate = onUpdate;
    this.#onOpen = onOpen;
  }

  init(point) {
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point);
    this.#point = point;

    this.#pointComponent.setOpenClickHandler(() => {
      this.#openEditor();
      document.addEventListener('keydown', this.#onDocumentKeyDown);
    });

    this.#pointComponent.setFavoriteClickHandler(() => {
      this.#toggleFavorites();
    });

    this.#pointEditComponent.setCloseClickHandler(() => {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    });

    this.#pointEditComponent.setSubmitHandler(() => {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    });

    if (!prevPointComponent || !prevPointEditComponent) {
      this.#renderPoint();
      return;
    }

    if (this.#mode === Mode.Closed) {
      prevPointComponent.element.replaceWith(this.#pointComponent.element);
    }

    if (this.#mode === Mode.Open) {
      prevPointEditComponent.element.replaceWith(this.#pointEditComponent.element);
    }

    prevPointComponent.removeElement();
    prevPointEditComponent.removeElement();
  }

  reset() {
    if (this.#mode !== Mode.Closed) {
      this.#closeEditor();
    }
  }

  destroy() {
    this.#pointComponent.removeElement();
    this.#pointEditComponent.removeElement();
  }

  #renderPoint = () => {
    render(this.#container, this.#pointComponent, Positions.BEFORE_END);
  }

  #openEditor = () => {
    this.#pointComponent.element.replaceWith(this.#pointEditComponent.element);
    this.#onOpen();
    this.#mode = Mode.Open;
  };

  #closeEditor = () => {
    this.#pointEditComponent.element.replaceWith(this.#pointComponent.element);
    this.#mode = Mode.Closed;
  };

  #toggleFavorites = () => {
    const updatedPoint = {
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    };
    this.#onUpdate(updatedPoint);
  };

  #onDocumentKeyDown = (evt) => {
    if (isEscape(evt)) {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    }
  };
}
