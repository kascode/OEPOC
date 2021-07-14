import * as React from 'react';
import { styled } from '@stitches/react';
import CustomerSelector from './Selectors/Customer';
import { useGate, useStore } from 'effector-react';
import { $editorMode, $order, $originalOrder, editorModeChanged, EditorModes, OrderEditorGate } from './store';
import Department from './Selectors/Department';
import Location from './Selectors/Location';
import ShiftsGroups from './ShiftsGroupEditor/ShiftsGroupsForm';
import PeriodEditorForm from './PeriodEditor/PeriodEditorForm';

const Container = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1200px',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '32px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2rem',
    borderRight: '8px solid',
    borderLeft: '8px solid',

    '& select': {
        width: '100%'
    },
    '& input': {
        width: '100%'
    }
});

const InputsWrapper = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gap: '20px 20px',
    gridTemplateAreas: `
". . Info Info"
". . Info Info"
". . . ."`,
    width: '100%',

    '& .Info': {
        gridArea: 'Info'
    }
});

const InputWrapper = styled('div', {
    height: '48px'
});

const $orderIsLoaded = $originalOrder.map(state => !!state);

const Form = (): JSX.Element => {
    useGate(OrderEditorGate);
    const orderIsLoaded = useStore($orderIsLoaded);
    const editorMode = useStore($editorMode);

    if (!orderIsLoaded) {
        return (
            <Container>
                <h2>Loading...</h2>
            </Container>
        );
    }

    return (
        <Container onSubmit={ (e) => {
            e.preventDefault();

            console.log($order.getState());
        } }>
            <h2>Edit order</h2>

            <InputsWrapper>
                <InputWrapper>
                    <CustomerSelector />
                </InputWrapper>

                <InputWrapper>
                    <Department />
                </InputWrapper>

                <InputWrapper>
                    <Location />
                </InputWrapper>

                <InputWrapper className="Info">
                    <h3>info</h3>
                </InputWrapper>
            </InputsWrapper>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <div style={{ paddingRight: '24px' }}>
                    <label htmlFor="mode_shifts">Shifts</label>
                    <input type="radio" value="shifts" name="edit_mode" id="mode_shifts" checked={ editorMode === EditorModes.shifts }
                        onChange={ () => editorModeChanged(EditorModes.shifts) }
                    />
                </div>

                <div>
                    <label htmlFor="mode_period">Period</label>
                    <input type="radio" value="shifts" name="edit_mode" id="mode_period" checked={ editorMode === EditorModes.period }
                        onChange={ () => editorModeChanged(EditorModes.period) }
                    />
                </div>
            </div>

            {
                editorMode === EditorModes.shifts
                    ? <ShiftsGroups/>
                    : null
            }

            {
                editorMode === EditorModes.period
                    ? <PeriodEditorForm />
                    : null
            }

            <div style={{ padding: '32px 0' }}>
                <button type="submit">Submit</button>
            </div>
        </Container>
    );
};

export default Form;
