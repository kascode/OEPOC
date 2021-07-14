import { createEvent, createStore } from 'effector-logger';
import { GroupShift, ShiftsGroup } from '../types';
import { nanoid } from 'nanoid';

export const daytimes = [ 'day', 'evening', 'night' ];

const defaultShiftsGroup: ShiftsGroup = {
    id: null,
    daytime: daytimes[0],
    start: '10:00',
    finish: '18:00',
    isNew: true,
    shiftsList: []
};

const createNewGroup = () => ({ ...defaultShiftsGroup, id: nanoid() });

const createResource = (date: string, count: number): GroupShift => ({
    date: new Date(date),
    count
});

const addResource = (resources: GroupShift[], date: string, count: number): GroupShift[] => [ ...resources, createResource(date, count) ];

const newGroupAdded = createEvent('new_shifts_group_added');

const groupRemoved = createEvent<string>('group_removed');

const groupChanged = createEvent<ShiftsGroup>('shifts_group_changed');
const daytimeChanged = createEvent<{ id: string; daytime: string }>('group_daytime_changed');
const startChanged = createEvent<{ id: string; start: string }>('group_start_changed');
const finishChanged = createEvent<{ id: string; finish: string }>('group_finish_changed');
const shiftsListChanged = createEvent<{ id: string; shiftsList: GroupShift[] }>('group_shifts_list_changed');
const shiftsListAdded = createEvent<{ id: string; date: string; count: number }>('group_shifts_list_element_added');

const $shiftsGroupsList = createStore<ShiftsGroup[]>([ createNewGroup() ])
    .on(newGroupAdded, (state => [ ...state, createNewGroup() ]))
    .on(groupRemoved, (state, id) => state.filter(g => g.id !== id))
    .on(groupChanged, (state, updatedGroup) => state.map(g => (
        g.id === updatedGroup.id
            ? updatedGroup
            : g
    )))
    .on(daytimeChanged, (state, { id, daytime }) => state.map(g => (
        g.id === id
            ? { ...g, daytime }
            : g
    )))
    .on(startChanged, (state, { id, start }) => state.map(g => (
        g.id === id
            ? { ...g, start }
            : g
    )))
    .on(finishChanged, (state, { id, finish }) => state.map(g => (
        g.id === id
            ? { ...g, finish }
            : g
    )))
    .on(shiftsListChanged, (state, { id, shiftsList }) => state.map(g => (
        g.id === id
            ? { ...g, shiftsList }
            : g
    )))
    .on(shiftsListAdded, (state, { id, date, count }) => state.map(g => (
        g.id === id
            ? { ...g, shiftsList: addResource(g.shiftsList, date, count) }
            : g
    )));

export { $shiftsGroupsList, newGroupAdded, groupRemoved, groupChanged, daytimeChanged, startChanged, finishChanged, shiftsListAdded };

