import { TABS } from '../constants';
import SmartView from './smart-view';

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
    `<div class="trip-controls__navigation">
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs trip-tabs">
        ${tabsTemplate}
      </nav>
     </div>`
  );
};

export default class Navigation extends SmartView {
  _state = {
    activeTab: TABS[0]
  }

  get template() {
    return createNavigationTemplate(this._state.activeTab);
  }

  setNavigationClickHandler(cb) {
    this._handlers.onNavigationClick = cb;
    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== 'A') {
        return;
      }

      const tab = evt.target.textContent;
      this._handlers.onNavigationClick(tab);
      this.updateState({activeTab: tab});
      this.updateElement();
    });
  }

  _restoreHandlers = () => {
    this.setNavigationClickHandler(this._handlers.onNavigationClick);
  }
}
