import AbstractObservable from '../utils/abstract-observable.js';
import { Filters } from '../constants.js';

export default class FiltersModel extends AbstractObservable {
  #filter = Filters.Everything;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
