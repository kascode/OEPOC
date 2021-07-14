import * as React from 'react';
import { useStore } from 'effector-react';
import { createEvent, createStore } from 'effector-logger';
import { OrderDetailsForEditor } from '../helpers';

export const dateChanged = createEvent<string>('period_start_changed');
export const dateChangedFromOriginalOrder = createEvent<OrderDetailsForEditor>('period_start_changed');

const $date = createStore<string | null>(null)
    .on(dateChanged, (state, date) => date)
    .on(dateChangedFromOriginalOrder, (state, order) => (order.periodStart ? order.periodStart : state));

const PeriodStart = (): JSX.Element => {
    const value = useStore($date)

    return (
        <input onChange={ event => dateChanged(event.currentTarget.value) }
            type="date"
            value={ value?.slice(0, 10) ?? undefined }
        />
    );
};

export { $date as $periodStartDate, dateChangedFromOriginalOrder as periodStartChangedFromOriginalOrder }

export default PeriodStart;
