import * as React from 'react';
import { createGate, useGate, useStore } from 'effector-react';
import Api from '../api';
import { createEffect, createEvent, createStore, forward, guard } from 'effector-logger';
import { OrderDetailsForEditor } from '../helpers';
import { $customer, $customerSet } from './Customer';

const LocationSelectorGate = createGate();

const fetchLocationsFx = createEffect(Api.fetchLocations);

const locationChanged = createEvent<string | null>('location_changed');
export const locationChangedFromOriginalOrder = createEvent<OrderDetailsForEditor>('location_changed_from_original_order');

export const $location = createStore<string | null>(null)
    .on(locationChanged, (state, payload) => payload)
    .on(locationChangedFromOriginalOrder, (state, order) => order.location);

const $locations = createStore<string[]>([]);

guard({
    source: $customer,
    filter: $customerSet,
    target: fetchLocationsFx
});

forward({
    from: fetchLocationsFx.done.map(({ result }) => result),
    to: $locations
});

const Location = (): JSX.Element => {
    useGate(LocationSelectorGate);
    const location = useStore($location);
    const locations = useStore($locations);

    return (
        <select value={ location || undefined }
            onChange={ event => locationChanged(event.currentTarget.value) }
        >
            { locations.map((location) => <option key={ location } value={ location }>{ location }</option>) }
        </select>
    );
};

export default Location;
