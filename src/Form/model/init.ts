import { fetchOrderFx } from './index';
import { forward, sample } from 'effector-logger';
import { departmentChangedFromOriginalOrder } from '../Selectors/Department/model';
import { locationChangedFromOriginalOrder } from '../Selectors/Location/model';
import { periodStartChangedFromOriginalOrder, periodStartChangedFromShiftsGroup } from '../Selectors/PeriodStart';
import { periodEndChangedFromOriginalOrder, periodEndChangedFromShiftsGroup } from '../Selectors/PeriodEnd';
import { $shiftsGroupsList } from '../ShiftsGroupEditor/model';
import { getPeriodDatesFromShiftsGroups } from '../helpers';
import { customerChangedFromOriginalOrder } from '../Selectors/Customers/model';
import { OrderEditorGate } from '../Form';
import { $originalOrder } from './originalOrder';
import { ifcChangedFromOriginalOrder } from '../Selectors/InformationForCandidates';

sample({
    source: $shiftsGroupsList,
    fn: source => getPeriodDatesFromShiftsGroups(source),
    target: [ periodStartChangedFromShiftsGroup, periodEndChangedFromShiftsGroup ]
})

forward({
    from: OrderEditorGate.open,
    to: fetchOrderFx
});

forward({
    from: fetchOrderFx.doneData,
    to: [ customerChangedFromOriginalOrder, departmentChangedFromOriginalOrder, locationChangedFromOriginalOrder,
        periodStartChangedFromOriginalOrder, periodEndChangedFromOriginalOrder, ifcChangedFromOriginalOrder
    ]
});

$originalOrder.on(fetchOrderFx.doneData, (state, order) => order);
