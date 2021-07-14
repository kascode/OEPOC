import * as React from 'react';
import { createGate, useGate, useStore } from 'effector-react';
import { createEffect, createEvent, createStore, forward, guard } from 'effector-logger';

import Api from '../api';
import { OrderDetailsForEditor } from '../helpers';
import { $customer, $customerSet } from './Customer';

const DepartmentSelectorGate = createGate();

const fetchDepartmentsFx = createEffect(Api.fetchDepartments);

const departmentChanged = createEvent<string | null>('department_changed');
export const departmentChangedFromOriginalOrder = createEvent<OrderDetailsForEditor>('department_changed_from_original_order');

export const $department = createStore<string | null>(null)
    .on(departmentChanged, (state, payload) => payload)
    .on(departmentChangedFromOriginalOrder, (state, order) => order.department);

const $departments = createStore<string[]>([]);

const $error = createStore<Error | null>(null)
    .on(fetchDepartmentsFx.failData, (state, error) => error)
    .reset($departments);

guard({
    source: $customer,
    filter: $customerSet,
    target: fetchDepartmentsFx
});

forward({
    from: fetchDepartmentsFx.done.map(({ result }) => result),
    to: $departments
});

const Department = (): JSX.Element => {
    useGate(DepartmentSelectorGate);
    const customer = useStore($department);
    const error = useStore($error);
    const departments = useStore($departments);

    return (
        <>
            <select value={ customer || undefined }
                onChange={ event => departmentChanged(event.currentTarget.value) }
            >
                { departments.map((department) => <option key={ department } value={ department }>{ department }</option>) }
            </select>

            { error ? <p style={{ color: 'red' }}>{ error }</p> : null }
        </>
    );
};

export default Department;
