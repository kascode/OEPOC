import { createDomain } from 'effector-logger';

const periodDateDomain = createDomain();

const dateChanged = periodDateDomain.createEvent<Date>()

const $date = periodDateDomain.createStore<Date | null>(null)
    .on(dateChanged, (_, payload) => payload);

export { periodDateDomain };
