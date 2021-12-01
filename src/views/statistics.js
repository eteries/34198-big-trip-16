import { createElement } from '../utils/render';
import { STATISTICS } from '../constants';

const createStatisticsListTemplate = () => (
  STATISTICS
    .map((name) => (
      `<div class="statistics__item">
        <canvas class="statistics__chart" id="${name}" width="900"></canvas>
      </div>`
    ))
    .join('')
);


const createStatisticsTemplate = () => {
  const statisticsListTemplate = createStatisticsListTemplate();
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>
      ${statisticsListTemplate}
    </section>`
  );
};

export default class Statistics {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createStatisticsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
