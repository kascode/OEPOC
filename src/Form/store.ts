import { combine, createEffect, createEvent, createStore, forward, sample } from 'effector-logger';
import { createGate } from 'effector-react';

import { $customer, customerChangedFromOriginalOrder } from './Selectors/Customer';
import { $department, departmentChangedFromOriginalOrder } from './Selectors/Department';
import { $location, locationChangedFromOriginalOrder } from './Selectors/Location';
import { getPeriodDatesFromShiftsGroups, OrderDetailsForEditor } from './helpers';
import Api from './api';
import {
    $periodStartDate,
    periodStartChangedFromOriginalOrder,
    periodStartChangedFromShiftsGroup
} from './Selectors/PeriodStart';
import { $shiftsGroupsList } from './ShiftsGroupEditor/shiftsGroups';
import {
    $periodEndDate,
    periodEndChangedFromOriginalOrder,
    periodEndChangedFromShiftsGroup
} from './Selectors/PeriodEnd';

enum EditorModes {
    shifts = 'mode_shifts',
    period = 'mode_period'
}

interface PeriodDates {
    start: string;
    end: string;
}

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

const editorModeChanged = createEvent<EditorModes>('editor_mode_changed');

const $editorMode = createStore(EditorModes.shifts)
    .on(editorModeChanged, (_, payload) => payload);

sample({
    source: $shiftsGroupsList,
    fn: source => getPeriodDatesFromShiftsGroups(source),
    target: [ periodStartChangedFromShiftsGroup, periodEndChangedFromShiftsGroup ]
})

export { $order, $originalOrder, OrderEditorGate, $editorMode, editorModeChanged, EditorModes, PeriodDates };
