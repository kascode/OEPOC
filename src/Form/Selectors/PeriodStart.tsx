import * as React from 'react';
import { useStore } from 'effector-react';
import { createEvent, createStore } from 'effector-logger';
import { OrderDetailsForEditor } from '../helpers';
import { PeriodDates } from '../domain/Period';

const dateChanged = createEvent<string>('period_start_changed');
const dateChangedFromOriginalOrder = createEvent<OrderDetailsForEditor>('period_start_changed_from_order');
const dateChangedFromShiftsGroup = createEvent<PeriodDates | undefined>('period_start_changed_from_shifts_groups');

const $date = createStore<string | null>(null)
    .on(dateChanged, (state, date) => date)
    .on(dateChangedFromOriginalOrder, (state, order) => (order.periodStart ? order.periodStart : state))
    .on(dateChangedFromShiftsGroup, (state, periods) => periods ? periods.start : state);

const PeriodStart = (): JSX.Element => {
    const value = useStore($date)

    return (
        <>
            <label htmlFor="period_start_input">Period start</label>
            <input id="period_start_input" onChange={ event => dateChanged(event.currentTarget.value) }
                type="date"
                value={ value?.slice(0, 10) ?? undefined }
            />
        </>
    );
};

export {
    $date as $periodStartDate,
    dateChangedFromOriginalOrder as periodStartChangedFromOriginalOrder,
    dateChangedFromShiftsGroup as periodStartChangedFromShiftsGroup
}

export default PeriodStart;
