import * as React from 'react';
import { createGate, useGate, useStore } from 'effector-react';
import { $location, $locations, $locationsAreLoading, locationChanged } from './model';

export const LocationSelectorGate = createGate();

const Location = (): JSX.Element => {
    useGate(LocationSelectorGate);
    const location = useStore($location);
    const locations = useStore($locations);
    const locationsAreLoading = useStore($locationsAreLoading);

    if (locationsAreLoading) {
        return <span>Loading locations...</span>
    }

    return (
        <>
            <select value={ location || undefined }
                onChange={ event => locationChanged(event.currentTarget.value) }
            >
                { locations.map((location) => <option key={ location } value={ location }>{ location }</option>) }
            </select>
        </>
    );
};

export default Location;
