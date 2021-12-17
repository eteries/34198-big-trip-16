import PointView from '../views/point';
import PointEditView from '../views/point-edit';
import { isEscape, Positions, render } from '../utils/dom';

export default class Point {
  #container;
  #pointComponent;
  #pointEditComponent;
  #toggleFavorite;
  #point;

  constructor(container, toggleFavorites) {
    this.#container = container;
    this.#toggleFavorite = toggleFavorites;
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
      this.updatedPoint = {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      };
      this.#toggleFavorite(this.updatedPoint);
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

    prevPointComponent.element.replaceWith(this.#pointComponent.element);
    prevPointEditComponent.element.replaceWith(this.#pointEditComponent.element);

    prevPointComponent.removeElement();
    prevPointEditComponent.removeElement();
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
