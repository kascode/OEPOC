import { createEvent, createStore } from 'effector-logger';
import { addResourceToShiftsGroup, createNewGroup, GroupShift, ShiftsGroup } from '../../domain/ShiftsGroup';

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
            ? addResourceToShiftsGroup(g, date, count)
            : g
    )));

export { $shiftsGroupsList, newGroupAdded, groupRemoved, groupChanged, daytimeChanged, startChanged, finishChanged, shiftsListAdded };

