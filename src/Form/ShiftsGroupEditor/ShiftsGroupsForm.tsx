import * as React from 'react';
import { $shiftsGroupsList } from './shiftsGroups';
import { useList } from 'effector-react';
import ShiftsGroup from './ShiftsGroup';
import OrderContentEditorWrapper from '../OrderContentEditorWrapper';

const $shiftsGroupsIds = $shiftsGroupsList.map(state => state.map(group => group.id));

const ShiftsGroupsForm = (): JSX.Element => {
    const groupsList = useList($shiftsGroupsIds, (id) => id ? <ShiftsGroup key={ id } id={ id } /> : null)

    return (
        <OrderContentEditorWrapper>
            <h3>Shift groups editor</h3>

            { groupsList }
        </OrderContentEditorWrapper>
    );
};

export default ShiftsGroupsForm;
