const TABS = [
  'Table',
  'Stats'
];

const activeTab = TABS[0];

const createTabsTemplate = () => (
  TABS
    .map((tabName) => {
      const activeClass = tabName === activeTab ? 'trip-tabs__btn--active' : '';
      return (
        `<a class="trip-tabs__btn ${activeClass}" href="#">${tabName}</a>`
      );
    })
    .join('')
);

export const createNavigationTemplate = () => {
  const tabsTemplate = createTabsTemplate();
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${tabsTemplate}
    </nav>`
  );
};
