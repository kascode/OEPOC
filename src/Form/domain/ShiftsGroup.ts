import { createId } from '../../common';

export const daytimes = [ 'day', 'evening', 'night' ];

export type GroupShift = {
    date: TenantDate;
    count: number;
}

export type ShiftsGroup = {
    id: UniqueID;
    daytime: string;
    finish: TimeOnlyString;
    isNew: boolean;
    shiftsList: GroupShift[];
    start: TimeOnlyString;
};

const defaultShiftsGroup: ShiftsGroup = {
    id: '',
    daytime: daytimes[0],
    start: '10:00',
    finish: '18:00',
    isNew: true,
    shiftsList: []
};

export const createNewGroup = () => ({ ...defaultShiftsGroup, id: createId() });

const createGroupShift = (date: string, count: number): GroupShift => ({
    date: new Date(date),
    count
});

export const addResourceToShiftsGroup = (shiftsGroup: ShiftsGroup, date: string, count: number): ShiftsGroup => ({
    ...shiftsGroup,
    shiftsList: [ ...shiftsGroup.shiftsList, createGroupShift(date, count) ]
});
