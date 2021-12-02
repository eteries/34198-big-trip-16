import { TABS } from '../constants';
import { createElement } from '../utils/dom';

const createTabsTemplate = (activeTab) => (
  TABS
    .map((tabName) => {
      const activeClass = tabName === activeTab ? 'trip-tabs__btn--active' : '';
      return (
        `<a class="trip-tabs__btn ${activeClass}" href="#">${tabName}</a>`
      );
    })
    .join('')
);

const createNavigationTemplate = (activeTab) => {
  const tabsTemplate = createTabsTemplate(activeTab);
  return (
    `<nav class="trip-controls__trip-tabs trip-tabs">
      ${tabsTemplate}
    </nav>`
  );
};

export default class Navigation {
  #element = null;
  #activeTab = TABS[0];

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNavigationTemplate(this.#activeTab);
  }

  removeElement() {
    this.#element = null;
  }
}
