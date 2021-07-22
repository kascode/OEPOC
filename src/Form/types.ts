export const UNDETECTED = 'Undetected';

export interface CounterOfStatuses {
    sent?: number | null;
    accepted?: number | null;
    rejected?: number | null;
    assigned?: number | null;
    submit?: number | null;
    expired?: number | null;
    lost?: number | null;
}

export interface Remaining {
    day?: number | null;
    hour?: number | null;
    minute?: number | null;
}

export enum OrderDetailsStatus {
    New = 'New',
    Updated = 'Updated',
    Viewed = 'Viewed',
    ManuallyCreated = 'ManuallyCreated',
}

export enum ShiftPeriodStatus {
    New = 'New',
    Sent = 'Sent',
    Accepted = 'Accepted',
    Assigned = 'Assigned',
    Lost = 'Lost',
    Submit = 'Submit',
    Expired = 'Expired',
    Uncertain = 'Uncertain',
    Rejected = 'Rejected',
    CustomerAccepted = 'CustomerAccepted',
    CustomerRejected = 'CustomerRejected',
    Registered = 'Registered'
}

export enum StatusOfCompletion {
    New = 'New',
    Progress = 'Progress',
    Sent = 'Sent',
    Completed = 'Completed',
    Expired = 'Expired',
    Accepted = 'Accepted',
    Submitted = 'Submitted',
    Assigned = 'Assigned',
    Lost = 'Lost',
    Registered = 'Registered',
    Hidden = 'Hidden',
    Archived = 'Archived'
}

export type PeriodStatus = Exclude<ShiftPeriodStatus, ShiftPeriodStatus.Lost | ShiftPeriodStatus.Uncertain | ShiftPeriodStatus.Registered>

export enum ShiftDayTime {
    Day = 'Day',
    Evening = 'Evening',
    Night = 'Night'
}


export enum DayTime {
    Morning = 'Morning',
    Day = 'Day',
    Night = 'Night',
}

export type PeriodType = DayTime;

export interface OfferedShiftDTO {
    shiftId: string | null;
    acceptedTime?: string;
    rejectedTime?: string;
    offeredTime: string;
    status: ShiftStatus;
}

export interface OfferedShift {
    shiftId: string | null;
    acceptedTime?: Date;
    rejectedTime?: Date;
    offeredTime: Date;
    status: ShiftStatus;
}

export interface CandidateDTO {
    candidateId: string;
    reason: string;
    name: string;
    email: string;
    mobilePhone: string;
    ranking: number;
    offeredShifts: OfferedShiftDTO[];
    offeredWeeks: OfferedPeriodDTO[];
    counterOfStatuses: CounterOfStatuses;
    counterOfPeriodStatuses: CounterOfStatuses;
}

export interface Candidate {
    candidateId: string;
    reason: string;
    name: string;
    email: string;
    mobilePhone: string;
    ranking: number;
    offeredShifts: OfferedShift[];
    offeredWeeks: OfferedPeriod[];
    counterOfStatuses: CounterOfStatuses;
    counterOfPeriodStatuses: CounterOfStatuses;
}

export interface PeriodWeek {
    weekNumber: string;
    year: number;
    types: PeriodType[];
    startWeekDay: number;
    endWeekDay: number;
}

export interface Period {
    periodId: string;
    status: PeriodStatus | number;
    periodWeeks: PeriodWeek[];
    positionPercentage: number;
    rotatingShifts: boolean;
    onCallDuty: boolean;
}

export interface OfferedPeriodDTO {
    periodId: string;
    week: string; // really?
    year: number;
    acceptedTime: string | null;
    offeredTime: string;
    status: PeriodStatus;
    type: PeriodType;
    exceptDays: string[];
    positionPercentage: number | null;
    rotatingShifts: boolean | null;
    onCallDuty: boolean | null;
}

export interface OfferedPeriod {
    periodId: string;
    week: string; // really?
    year: number;
    acceptedTime: Date | null;
    offeredTime: Date;
    status: PeriodStatus;
    type: PeriodType;
    exceptDays: Date[];
    positionPercentage: number | null;
    rotatingShifts: boolean | null;
    onCallDuty: boolean | null;
}

export type ShiftStatus = ShiftPeriodStatus;

export enum ShiftStatusForFilters {
    Accepted = ShiftPeriodStatus.Accepted,
    Assigned = ShiftPeriodStatus.Assigned,
    Expired = ShiftPeriodStatus.Expired,
    New = ShiftPeriodStatus.New,
    Lost = ShiftPeriodStatus.Lost,
    Registered = ShiftPeriodStatus.Registered,
    Sent = ShiftPeriodStatus.Sent,
    Submit = ShiftPeriodStatus.Submit
}

export interface ShiftDTO {
    id: string;
    date: string;
    start: string;
    finish: string;
    description: null;
    status: ShiftStatus;
    count: number;
    totalCount: number;
    isConflict: boolean;
    isManuallyEdited: boolean;
    lunchBreak: string | null;
}

export interface Shift {
    id: string;
    date: Date;
    start: Date;
    finish: Date;
    description: null;
    status: ShiftStatus;
    count: number;
    totalCount: number;
    isConflict: boolean;
    isManuallyEdited: boolean;
    lunchBreak: string | null;
}

export interface ResponsibleUser {
    id: string;
    fullName: string;
    firstLetters: string;
}

export interface RecmanData {
    projectId: string;
    companyId: string;
}

export interface OrderDetailsDTO {
    shifts: ShiftDTO[];
    candidates: CandidateDTO[];
    hasProject: boolean;
    filterPeriodEnd: string;
    filterPeriodStart: string;
    originalEmailTitle: string;
    period: Period | null;
    processedShifts: number;
    id: string;
    customer: string;
    department: string;
    periodStart: string;
    periodEnd: string;
    totalShifts: number;
    role: string | null;
    deadline: string | null;
    location: string | null;
    matches: number;
    dateTimeReceived: string;
    responsibleUsers: ResponsibleUser[];
    status: OrderDetailsStatus;
    statusOfCompletion: StatusOfCompletion;
    customerEmail: string | null;
    isUncertain: boolean;
    recmanData: RecmanData;
    remaining: Remaining | null;

}

export type ContactPerson = {
    email?: string;
    homePhone?: string;
    id: string;
    mobilePhone: string;
    name?: string;
    officePhone?: string;
    title?: string;
}

export type OrderDetails = {
    shifts: Shift[];
    candidates: Candidate[];
    hasProject: boolean;
    filterPeriodEnd: string;
    filterPeriodStart: string;
    originalEmailTitle: string;
    period: Period | null;
    processedShifts: number;
    id: string;
    customer: string;
    department: string;
    periodStart: Date;
    periodEnd: Date;
    totalShifts: number;
    role: string | null;
    deadline: Date | null;
    location: string | null;
    matches: number;
    dateTimeReceived: Date;
    responsibleUsers: ResponsibleUser[];
    status: OrderDetailsStatus;
    statusOfCompletion: StatusOfCompletion;
    customerEmail: string | null;
    isUncertain: boolean;
    remaining: Remaining | null;
    recmanData: RecmanData;
    contactPerson?: ContactPerson;
}

export enum ShiftTag {
    day = 'Day',
    midday = 'Evening',
    night = 'Night',
    none = 'Not set'
}
