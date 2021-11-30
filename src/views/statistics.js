const STATISTICS = [
  'money',
  'type',
  'time',
];

const createStatisticsListTemplate = () => (
  STATISTICS
    .map((name) => (
      `<div class="statistics__item">
        <canvas class="statistics__chart" id="${name}" width="900"></canvas>
      </div>`
    ))
    .join('')
);


export const createStatisticsTemplate = () => {
  const statisticsListTemplate = createStatisticsListTemplate();
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>
      ${statisticsListTemplate}
    </section>`
  );
};
