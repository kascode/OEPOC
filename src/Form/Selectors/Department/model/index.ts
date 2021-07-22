import { createEffect, createEvent, createStore } from 'effector-logger';
import { OrderDetailsForEditor } from '../../../helpers';
import Api from '../../../api';

const departmentChanged = createEvent<string | null>('department_changed');
const departmentChangedFromOriginalOrder = createEvent<OrderDetailsForEditor>('department_changed_from_original_order');
const departmentsReceived = createEvent<string[]>('departments_received');

const fetchDepartmentsFx = createEffect(Api.fetchDepartments);

const $department = createStore<string | null>(null)
    .on(departmentChanged, (state, payload) => payload)
    .on(departmentChangedFromOriginalOrder, (state, order) => order.department);

const $departments = createStore<string[]>([])
    .on(departmentsReceived, (_, departments) => departments);

const $departmentsLoading = createStore(false)
    .on(fetchDepartmentsFx.pending, () => true)
    .reset(departmentsReceived);

const $error = createStore<Error | null>(null)
    .reset($departments);

export { $department, $departments, departmentChangedFromOriginalOrder, departmentChanged, $error, fetchDepartmentsFx,
    $departmentsLoading, departmentsReceived };
