import { TABS } from '../constants';
import AbstractView from './abstract-view';

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

export default class Navigation extends AbstractView {
  #activeTab = TABS[0];

  get template() {
    return createNavigationTemplate(this.#activeTab);
  }
}
