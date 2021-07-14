import * as React from 'react';
import { createGate, useGate, useStore } from 'effector-react';

import { createEffect, createEvent, createStore, guard } from 'effector-logger';
import Api from '../api';
import { OrderDetailsForEditor } from '../helpers';

const CustomerSelectorGate = createGate();

const fetchCustomersFx = createEffect({
    handler: Api.fetchCustomers
});

const customerChanged = createEvent<string | null>('customer_changed');
export const customerChangedFromOriginalOrder = createEvent<OrderDetailsForEditor>('customer_changed_from_original_order');

export const $customer = createStore<string | null>(null)
    .on(customerChanged, (state, payload) => payload)
    .on(customerChangedFromOriginalOrder, (state, order) => order.customer);

const $customerDisabled = createStore<boolean>(false)
    .on(customerChangedFromOriginalOrder, (_) => true);

export const $customerSet = $customer.map((state) => !!state);
const $customerNotSet = $customerSet.map((state) => !state);

const $customers = createStore<string[]>([])
    .on(customerChangedFromOriginalOrder, (state, order) => {
        if (order.customer && !state.includes(order.customer)) {
            return [ ...state, order.customer ];
        }

        return state;
    });

guard({
    clock: CustomerSelectorGate.open,
    filter: $customerNotSet,
    target: fetchCustomersFx
});

const CustomerSelector = (): JSX.Element => {
    useGate(CustomerSelectorGate);
    const customer = useStore($customer);
    const customerDisabled = useStore($customerDisabled);
    const customers = useStore($customers);

    return (
        <select disabled={ customerDisabled }
            value={ customer || undefined }
            onChange={ event => customerChanged(event.currentTarget.value) }
        >
            { customers.map((customer) => <option key={ customer } value={ customer }>{ customer }</option>) }
        </select>
    );
};

export default CustomerSelector;
