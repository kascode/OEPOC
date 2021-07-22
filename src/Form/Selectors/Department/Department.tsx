import * as React from 'react';
import { useStore } from 'effector-react';
import { $department, $departments, $departmentsLoading, $error, departmentChanged } from './model';

const Department = (): JSX.Element => {
    const department = useStore($department);
    const error = useStore($error);
    const departments = useStore($departments);
    const loading = useStore($departmentsLoading);

    if (loading) {
        return <span>Departments loading...</span>;
    }

    return (
        <>
            <select value={ department || undefined }
                onChange={ event => departmentChanged(event.currentTarget.value) }
            >
                { departments.map((department) => <option key={ department } value={ department }>{ department }</option>) }
            </select>

            { error ? <p style={{ color: 'red' }}>{ error }</p> : null }
        </>
    );
};

export default Department;
