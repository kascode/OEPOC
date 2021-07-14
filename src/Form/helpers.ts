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

