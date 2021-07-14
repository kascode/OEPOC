import * as React from 'react';
import { styled } from '@stitches/react';
import CustomerSelector from './Selectors/Customer';
import { useGate, useStore } from 'effector-react';
import { $order, $originalOrder, OrderEditorGate } from './store';
import Department from './Selectors/Department';
import Location from './Selectors/Location';
import PeriodStart from './Selectors/PeriodStart';
import ShiftsGroups from './ShiftsGroupEditor/ShiftsGroupsForm';
import PeriodEnd from './Selectors/PeriodEnd';

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

const ShiftsGroupsWrapper = styled('div', {
    width: '100%'
});

const $orderIsLoaded = $originalOrder.map(state => !!state);

const Form = (): JSX.Element => {
    useGate(OrderEditorGate);
    const orderIsLoaded = useStore($orderIsLoaded);

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

            <ShiftsGroupsWrapper>
                <h3>Shift groups editor</h3>

                <ShiftsGroups />
            </ShiftsGroupsWrapper>

            <div>
                <button type="submit">Submit</button>
            </div>
        </Container>
    );
};

export default Form;
