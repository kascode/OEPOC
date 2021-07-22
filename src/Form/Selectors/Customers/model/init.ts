import { guard, sample } from 'effector-logger';
import { CustomerSelectorGate } from '../Customer';
import { $customer, $customerNotSet, $customers, customerChanged, fetchCustomersFx } from './index';

guard({
    clock: CustomerSelectorGate.open,
    filter: $customerNotSet,
    target: fetchCustomersFx
});

sample({
    source: fetchCustomersFx.doneData,
    fn: (customers) => {
        if (customers.length === 1) {
            return customers[0];
        }

        return null;
    },
    target: customerChanged
});

sample({
    source: $customer,
    clock: fetchCustomersFx.doneData,
    fn: (customer, customers) => {
        if (customer && !customers.includes(customer)) {
            return [ ...customers, customer ];
        }

        return customers;
    },
    target: $customers
});
