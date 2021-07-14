import { ShiftsGroup } from './types';
import { PeriodDates } from './store';

const getPeriodDatesFromShiftsGroup = (shiftsGroup: ShiftsGroup): PeriodDates | undefined => {
    const {
        start,
        finish
    } = shiftsGroup;
    let periods: PeriodDates | undefined = undefined;

    shiftsGroup.shiftsList.forEach(shift => {
        const { date } = shift;

        if (!periods) {
            periods = {
                start: date.toISOString(),
                end: date.toISOString()
            }

            return;
        }

        const periodStart = new Date(periods.start);
        const periodEnd = new Date(periods.end);

        if (periodStart.getTime() > date.getTime()) {
            const [ hours, minutes ] = start.split(':');
            date.setHours(parseInt(hours), parseInt(minutes));
            periods.start = date.toISOString();
        }

        if (periodEnd.getTime() < date.getTime()) {
            const [ hours, minutes ] = finish.split(':');
            date.setHours(parseInt(hours), parseInt(minutes));
            periods.end = date.toISOString();
        }
    });

    return periods;
};

export const getPeriodDatesFromShiftsGroups = (shiftsGroups: ShiftsGroup[]): PeriodDates | undefined => {
    let periodDates: PeriodDates | undefined = undefined;

    shiftsGroups.forEach((group) => {
        const groupPeriodDates = getPeriodDatesFromShiftsGroup(group);

        if (!periodDates) {
            periodDates = groupPeriodDates;
        } else if (groupPeriodDates) {
            if (new Date(periodDates.start).getTime() > new Date(groupPeriodDates.start).getTime()) {
                periodDates.start = groupPeriodDates.start;
            }

            if (new Date(periodDates.end).getTime() < new Date(groupPeriodDates.end).getTime()) {
                periodDates.end = groupPeriodDates.end;
            }
        }
    });

    return periodDates;
};

export interface OrderDetailsForEditor {
    // id: string | null;
    customer: string | null;
    // deadline: Date | null;
    department: string | null;
    location: string | null;
    periodStart: string | null;
    periodEnd: string | null;
    // period: Period | null;
    // role: string | null;
    // contactPerson: ContactPerson | null;
    // informationForCandidates: string | null;
}

export const customers = [
    { label: 'One cus', value: 123 },
    { label: 'Two cus', value: 758 },
    { label: 'Three cus', value: 343 }
];

export const dummyRequest: OrderDetailsForEditor = {
    // 'period': null,
    // 'contactPerson': null,
    // 'id': '9d24588f-6d79-4c3a-9cff-8b42b0eac2bc',
    'customer': 'Västra Götalandsregion',
    'department': 'Bemanningsenhet',
    // 'informationForCandidates': 'Some info',
    'periodStart': '2021-05-30T22:00:00Z',
    'periodEnd': '2021-08-29T21:59:59Z',
    // 'role': 'Allmänsjuksköterska',
    // 'deadline': null,
    'location': 'Västra Götaland'
};

