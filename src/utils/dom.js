import AbstractView from '../views/abstract-view';

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

const render = (parent, child, position) => {
  const parentElement = parent instanceof AbstractView
    ? parent.element
    : parent;
  const childElement = child instanceof AbstractView
    ? child.element
    : child;

  parentElement.insertAdjacentElement(position, childElement);
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};

const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { Positions, createElement, render, remove, isEscape };
