export type PositionPercentage = number;
export type TimeOfDay = 'day' | 'evening' | 'night';

export type RequestPeriod = {
    weeksNumbers: number[];
    position: PositionPercentage;
    start: TenantDate;
    end: TenantDate;
    rotatingShifts: boolean;
    onCallDuty: boolean;
    timeOfDay: TimeOfDay[];
}

export type Interval = {
    start: Date,
    end: Date
}

export type PeriodDates = {
    start: DateTimeStringISO;
    end: DateTimeStringISO;
};

function getWeeksNumbersFromInterval(interval: Interval): number[] {
    return [23, 24, 25];
}

export function setPeriodStart(period: RequestPeriod, start: Date) {
    const { end } = period;

    const weeksNumbers = getWeeksNumbersFromInterval({ start, end });

    return {
        ...period,
        start,
        weeksNumbers
    }
}

export function setPeriodEnd(period: RequestPeriod, end: Date) {
    const { start } = period;

    const weeksNumbers = getWeeksNumbersFromInterval({ start, end });

    return {
        ...period,
        end,
        weeksNumbers
    }
}

export function addPeriodWeek(period: RequestPeriod, weekNumber: number) {
    const weeksNumbers = [ ...period.weeksNumbers, weekNumber ];

    weeksNumbers.sort();

    return {
        ...period,
        weeksNumbers
    };
}

export function removePeriodWeek(period: RequestPeriod, weekNumber: number) {
    const index = period.weeksNumbers.findIndex(w => w === weekNumber);
    const weeksNumbers = [ ...period.weeksNumbers ].splice(index, 1);

    return {
        ...period,
        weeksNumbers
    };
}
