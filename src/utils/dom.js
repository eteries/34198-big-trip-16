const Positions = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const createElement = (template) => {
  const wrapper = document.createElement('div');
  wrapper.insertAdjacentHTML(Positions.BEFORE_END, template);

  return wrapper.firstChild;
};

const renderElement = (container, element, position) => {
  container.insertAdjacentElement(position, element);
};

const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { Positions, createElement, renderElement, isEscape };
