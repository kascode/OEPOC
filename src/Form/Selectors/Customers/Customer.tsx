import * as React from 'react';
import { createGate, useGate, useStore } from 'effector-react';
import { $customer, $customerDisabled, $customers, customerChanged } from './model';

export const CustomerSelectorGate = createGate();

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
