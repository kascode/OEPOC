import * as React from 'react';
import { useStore } from 'effector-react';
import { createEvent, createStore } from 'effector-logger';
import { OrderDetailsForEditor } from '../helpers';
import { PeriodDates } from '../domain/Period';

const dateChanged = createEvent<string>('period_end_changed');
const dateChangedFromOriginalOrder = createEvent<OrderDetailsForEditor>('period_end_changed_from_order');
const dateChangedFromShiftsGroup = createEvent<PeriodDates | undefined>('period_end_changed_from_shifts_group');

const $date = createStore<string | null>(null)
    .on(dateChanged, (state, date) => date)
    .on(dateChangedFromOriginalOrder, (state, order) => (order.periodEnd ? order.periodEnd : state))
    .on(dateChangedFromShiftsGroup, (state, periods) => periods ? periods.end : state);

const PeriodEnd = (): JSX.Element => {
    const value = useStore($date)

    return (
        <>
            <label htmlFor="period_end_input">Period end</label>
            <input id="period_end_input" onChange={ event => dateChanged(event.currentTarget.value) }
                type="date"
                value={ value?.slice(0, 10) ?? undefined }
            />
        </>
    );
};

export { $date as $periodEndDate, dateChangedFromOriginalOrder as periodEndChangedFromOriginalOrder, dateChangedFromShiftsGroup as periodEndChangedFromShiftsGroup }

export default PeriodEnd;
