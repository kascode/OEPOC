import { combine } from 'effector';
import { $periodStartDate } from '../Selectors/PeriodStart';
import { $customer } from '../Selectors/Customers/model';
import { $department } from '../Selectors/Department/model';
import { $location } from '../Selectors/Location/model';
import { $periodEndDate } from '../Selectors/PeriodEnd';
import { $shiftsGroupsList } from '../ShiftsGroupEditor/model';
import { createEvent, createStore } from 'effector-logger';
import { $ifcText } from '../Selectors/InformationForCandidates';

const sendOrder = createEvent('send_order');
const orderSent = createEvent('order_sent');

const $sendingOrder = createStore(false)
    .on(sendOrder, () => true)
    .reset(orderSent);

const $order = combine({
    customer: $customer,
    department: $department,
    location: $location,
    periodStart: $periodStartDate,
    periodEnd: $periodEndDate,
    shiftGroups: $shiftsGroupsList.map((shiftGroups) => {
        if (shiftGroups.length === 1 && shiftGroups[0].shiftsList.length === 0) {
            return [];
        }

        return shiftGroups;
    }),
    informationForCandidates: $ifcText
});

export { $order, $sendingOrder, sendOrder, orderSent };
