import { guard, sample } from 'effector-logger';
import { $customer, $customerSet } from '../../Customers/model';
import { $department, $error, departmentsReceived, fetchDepartmentsFx } from './index';

guard({
    source: $customer,
    filter: $customerSet,
    target: fetchDepartmentsFx
});

sample({
    source: $department,
    clock: fetchDepartmentsFx.doneData,
    fn: (department, departments) => {
        if (department && !departments.includes(department)) {
            return [ ...departments, department ];
        }

        return departments;
    },
    target: departmentsReceived
});

$error.on(fetchDepartmentsFx.failData, (state, error) => error);
