import { STATISTICS } from '../constants';
import AbstractView from './abstract-view';

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

export default class Statistics extends AbstractView {
  get template() {
    return createStatisticsTemplate();
  }
}
