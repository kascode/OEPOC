import * as React from 'react';
import { useStore } from 'effector-react';
import {
    $shiftsGroupsList,
    daytimeChanged,
    daytimes,
    finishChanged,
    shiftsListAdded,
    startChanged
} from './shiftsGroups';
import { styled } from '@stitches/react';

const Container = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
});

const BasicInputs = styled('div', {
    width: '20%',
    paddingRight: '16px'
});

const DateInputWrapper = styled('div', {
    width: '20%',
    paddingRight: '16px'
});

const ResourcesWrapper = styled('div', {
    display: 'flex'
});

const Resource = styled('div', {
    paddingRight: '8px'
});

interface ShiftsGroupProps {
    id: string;
}

const ShiftsGroup = ({ id }: ShiftsGroupProps): JSX.Element | null => {
    const shiftsGroups = useStore($shiftsGroupsList);
    const shiftsGroup = shiftsGroups.find(group => group.id === id);

    console.log('!!!', shiftsGroups);

    if (!shiftsGroup) {
        return null;
    }

    const {
        daytime,
        start,
        finish,
        shiftsList,
        isNew
    } = shiftsGroup;

    const handleDaytimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newDaytime = event.currentTarget.value;

        daytimeChanged({ id, daytime: newDaytime });
    }

    const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStart = event.currentTarget.value;

        startChanged({id, start: newStart});
    };

    const handleFinishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFinish = event.currentTarget.value;

        finishChanged({id, finish: newFinish});
    };

    const handleDateSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.currentTarget.value;

        shiftsListAdded({ id, date, count: 1 });
    };

    return (
        <Container>
            <BasicInputs>
                <select value={ daytime }
                    onChange={ handleDaytimeChange }
                >
                    { daytimes.map(str => (<option key={ str } value={ str }>{ str }</option> )) }
                </select>

                <input type="time" value={ start } onChange={ handleStartChange } />
                <input type="time" value={ finish } onChange={ handleFinishChange } />
            </BasicInputs>

            <DateInputWrapper>
                <input type="date" onChange={ handleDateSelect } />
            </DateInputWrapper>

            <ResourcesWrapper>
                { shiftsList.map(el => (<Resource key={ el.date.toISOString() }>{ new Intl.DateTimeFormat().format(el.date) }<br />{ el.count }</Resource>)) }
            </ResourcesWrapper>
        </Container>
    );
};

export default ShiftsGroup;
