import { combine, createEffect, createStore, forward } from 'effector-logger';
import { createGate } from 'effector-react';

import { $customer, customerChangedFromOriginalOrder } from './Selectors/Customer';
import { $department, departmentChangedFromOriginalOrder } from './Selectors/Department';
import { $location, locationChangedFromOriginalOrder } from './Selectors/Location';
import { OrderDetailsForEditor } from './helpers';
import Api from './api';
import { $periodStartDate, periodStartChangedFromOriginalOrder } from './Selectors/PeriodStart';
import { $shiftsGroupsList } from './ShiftsGroupEditor/shiftsGroups';
import { $periodEndDate, periodEndChangedFromOriginalOrder } from './Selectors/PeriodEnd';

const OrderEditorGate = createGate();

const $order = combine({
    customer: $customer,
    department: $department,
    location: $location,
    periodStart: $periodStartDate,
    periodEnd: $periodEndDate,
    shiftsGroups: $shiftsGroupsList
});

export const fetchOrderFx = createEffect({
    handler: Api.fetchOrder
});

const $originalOrder = createStore<OrderDetailsForEditor | null>(null)
    .on(fetchOrderFx.doneData, (state, order) => order);

forward({
    from: OrderEditorGate.open,
    to: fetchOrderFx
});

forward({
    from: fetchOrderFx.doneData,
    to: [ customerChangedFromOriginalOrder, departmentChangedFromOriginalOrder, locationChangedFromOriginalOrder,
        periodStartChangedFromOriginalOrder, periodEndChangedFromOriginalOrder
    ]
});

export { $order, $originalOrder, OrderEditorGate };
