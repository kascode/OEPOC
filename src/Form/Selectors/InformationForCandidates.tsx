import * as React from 'react';
import { createEvent, createStore } from 'effector-logger';
import { OrderDetailsForEditor } from '../helpers';
import { useStore } from 'effector-react';

const ifcChanged = createEvent<string>('ifc_changed');
const ifcChangedFromOriginalOrder = createEvent<OrderDetailsForEditor>('ifc_changed_from_order');

const $ifcText = createStore('')
    .on(ifcChanged, (_, text) => text)
    .on(ifcChangedFromOriginalOrder, (_, order) => order.informationForCandidates || '');

const InformationForCandidates = (): JSX.Element => {
    const value = useStore($ifcText);

    return (
        <>
            <label htmlFor="ifc">Information for candidates</label>

            <div>
                <textarea id="ifc"
                    onChange={ event => ifcChanged(event.currentTarget.value) }
                >{ value }</textarea>
            </div>
        </>
    );
};

export { $ifcText, ifcChangedFromOriginalOrder };

export default InformationForCandidates;
