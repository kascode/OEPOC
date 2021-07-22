import { createEffect, createEvent, createStore } from 'effector-logger';
import { OrderDetailsForEditor } from '../../../helpers';
import { UNDETECTED } from '../../../types';
import Api from '../../../api';

const customerChanged = createEvent<string | null>('customer_changed');
export const customerChangedFromOriginalOrder = createEvent<OrderDetailsForEditor>('customer_changed_from_original_order');

const fetchCustomersFx = createEffect({
    handler: Api.fetchCustomers
});

const $customer = createStore<string | null>(null)
    .on(customerChanged, (state, payload) => payload)
    .on(customerChangedFromOriginalOrder, (state, order) => order.customer);

const $customerDisabled = createStore<boolean>(false)
    .on(customerChangedFromOriginalOrder, (_) => true);

const $customerSet = $customer.map((state) => !!state && state !== UNDETECTED);
const $customerNotSet = $customerSet.map((state) => !state);

const $customers = createStore<string[]>([])
    .on(customerChangedFromOriginalOrder, (state, order) => {
        if (order.customer && !state.includes(order.customer)) {
            return [ ...state, order.customer ];
        }

        return state;
    });

export { $customers, $customer, $customerSet, $customerDisabled, $customerNotSet, customerChanged, fetchCustomersFx }
