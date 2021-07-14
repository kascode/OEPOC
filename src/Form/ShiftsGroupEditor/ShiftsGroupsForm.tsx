import * as React from 'react';
import { $shiftsGroupsList } from './shiftsGroups';
import { useList } from 'effector-react';
import ShiftsGroup from './ShiftsGroup';

const $shiftsGroupsIds = $shiftsGroupsList.map(state => state.map(group => group.id));

const ShiftsGroupsForm = (): JSX.Element => {
    const groupsList = useList($shiftsGroupsIds, (id) => id ? <ShiftsGroup key={ id } id={ id } /> : null)

    return (
        <>
            { groupsList }
        </>
    );
};

export default ShiftsGroupsForm;
