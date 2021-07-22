import { createEffect, createEvent, createStore } from 'effector-logger';
import { OrderDetailsForEditor } from '../../../helpers';
import { $originalOrder } from '../../../model/originalOrder';
import Api from '../../../api';

const locationChanged = createEvent<string | null>('location_changed');
const undetectedValueReceived = createEvent('undetected_location_received');
const locationChangedFromOriginalOrder = createEvent<OrderDetailsForEditor | null>('location_changed_from_original_order');
const locationsLoaded = createEvent<string[]>('locations_loaded');

const fetchLocationsFx = createEffect({ sid: 'fetchLocation', handler: Api.fetchLocations });

const $locationsAreLoading = createStore(false);

const $originalOrderLocation = $originalOrder.map(state => state ? state.location : null);

const $locations = createStore<string[]>([])
    .on(locationsLoaded, (_, locations) => locations);

const $location = createStore<string | null>(null)
    .on(locationChanged, (state, payload) => payload)
    .on(undetectedValueReceived, () => null);

const $allowAutoselect = createStore(true)
    .on(undetectedValueReceived, () => false);

export { $location, $locations, $locationsAreLoading,
    locationChanged, undetectedValueReceived as undetectedLocationReceived, locationChangedFromOriginalOrder,
    $allowAutoselect as $allowLocationAutoselect, locationsLoaded, $originalOrderLocation, fetchLocationsFx }
