const Positions = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const renderTemplate = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

export { Positions, renderTemplate };
