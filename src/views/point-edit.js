import { POINT_TYPES } from '../constants.js';
import { destinations } from '../mocks/destinations.js';
import { offers as availableOffers } from '../mocks/offers.js';
import { getDestinationByName, getOffersByType } from '../utils/calculate';
import { convertPointToState, convertStateToPoint } from '../utils/point';
import SmartView from './smart-view';

const createPointTypeTemplate = (type, currentType) => {
  const checked = type === currentType ? 'checked' : '';
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
    </div>`
  );
};

const createPointTypesTemplate = (types, currentType) => (
  POINT_TYPES
    .map((type) => createPointTypeTemplate(type, currentType))
    .join('')
);

const createOfferTemplate = (currentOffer, selectedOffers) => {
  const {id, title, price} = currentOffer;
  const isAlreadySelected = selectedOffers.find((selected) => title === selected.title);

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
             id="event-offer-${id}"
             type="checkbox"
             name="event-offer"
             value="${id}"
             ${isAlreadySelected ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOffersTemplate = (selectedOffers, type) => {
  const currentOffers = getOffersByType(availableOffers, type);

  if (currentOffers.length === 0) {
    return '';
  }

  const offersListTemplate = currentOffers
    .map((offer) => createOfferTemplate(offer, selectedOffers))
    .join('');

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersListTemplate}
      </div>
    </section>`;
};

const createDestinationOptionsTemplate = () => (
  destinations
    .map(({name}) => `<option value="${name}"></option>`)
    .join('')
);

const createPicturesTemplate = (pictures) => (
  pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')
);

const createDestinationsTemplate = (destination) => {
  if (!destination) {
    return  '';
  }

  const picturesTemplate = createPicturesTemplate(destination.pictures);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${picturesTemplate}
        </div>
      </div>
    </section>`
  );
};

const createPointEditTemplate = (state) => {
  const {type, dateFromValue, dateToValue, basePrice, offers, destination} = state;

  const typesTemplate = createPointTypesTemplate(POINT_TYPES, type);
  const destinationOptionsTemplate = createDestinationOptionsTemplate();
  const offersTemplate = createOffersTemplate(offers, type);
  const destinationsTemplate = createDestinationsTemplate(destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationOptionsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromValue}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToValue}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${destinationsTemplate}
        </section>
      </form>
    </li>`
  );
};

export default class PointEdit extends SmartView {
  constructor(point) {
    super();
    this._state = convertPointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state);
  }

  setCloseClickHandler(cb) {
    this._handlers.onCloseClick = cb;
    const closeButton = this.element.querySelector('.event__rollup-btn');
    closeButton.addEventListener('click', this._handlers.onCloseClick);
  }

  setSubmitHandler(cb) {
    this._handlers.onSubmit = cb;
    const editForm = this.element.querySelector('.event--edit');
    editForm.addEventListener('submit', this.#onSubmit);
  }

  reset = (point) => {
    this.updateState(convertPointToState(point));
    this.updateElement();
  }

  #onSubmit = (evt) => {
    evt.preventDefault();
    this._handlers.onSubmit(convertStateToPoint(this._state));
  }

  #onTypeChange = (evt) => {
    this.updateState({
      type: evt.target.value,
      offers: [],
    });
    this.updateElement();
  }

  #onOffersChange = ({target: checkbox}) => {
    const offers = [...this._state.offers];
    if (checkbox.checked) {
      const currentOffers = getOffersByType(availableOffers, this._state.type);
      const newOffer = currentOffers.find(({id}) => id.toString() === checkbox.value);
      if (newOffer) {
        offers.push(newOffer);
      }
    }
    else {
      const index = offers.findIndex(({id}) => id.toString() === checkbox.value);
      if (index > -1) {
        offers.splice(index, 1);
      }
    }

    this.updateState({
      offers
    });
    this.updateElement();
  }

  #onDestinationChange = (evt) => {
    const value = evt.target.value;

    if (!value) {
      return;
    }

    const destination = getDestinationByName(destinations, evt.target.value);

    if (!destination) {
      return;
    }

    this.updateState({
      destination,
    });
    this.updateElement();
  }

  #onPriceChange = (evt) => {
    const basePrice = parseInt(evt.target.value, 10);

    if (!isFinite(basePrice) || basePrice < 0) {
      return;
    }

    this.updateState({
      basePrice,
    });
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._handlers.onCloseClick);
    this.setSubmitHandler(this._handlers.onSubmit);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#onDestinationChange);
    this.element.querySelector('.event__details').addEventListener('change', this.#onOffersChange);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceChange);
  }
}

