import { guard, sample, split } from 'effector-logger';
import {
    $allowLocationAutoselect, $location,
    $locations,
    $locationsAreLoading, $originalOrderLocation, fetchLocationsFx,
    locationChanged,
    locationsLoaded,
    undetectedLocationReceived
} from './index';
import { UNDETECTED } from '../../../types';
import { $customer, $customerSet } from '../../Customers/model';

$locationsAreLoading.on(fetchLocationsFx.pending, (_) => true)
    .on(locationsLoaded, () => false);

split({
    source: $originalOrderLocation,
    match: {
        undetected: (location ) => location === UNDETECTED,
        detected: (location) => location !== UNDETECTED
    },
    cases: {
        undetected: undetectedLocationReceived,
        detected: locationChanged
    }
});

guard({
    source: $customer,
    filter: $customerSet,
    target: fetchLocationsFx
});

sample({
    source: $location,
    clock: fetchLocationsFx.doneData,
    fn: ((location, locations) => {
        if (location && !locations.includes(location)) {
            return [ ...locations, location ];
        }

        return locations;
    }),
    target: locationsLoaded
});

sample({
    source: [ $allowLocationAutoselect, $location ],
    clock: $locations,
    fn: ([ allowAutoselect, location ], clock) => {
        if (!location && clock.length === 1 && allowAutoselect) {
            return clock[0];
        }

        return location;
    },
    target: $location
});
