import { createEffect, forward, sample } from 'effector-logger';
import Api from '../api';
import { $order, orderSent, sendOrder } from './order';

const sendOrderFx = createEffect(Api.sendOrder);

sample({
    source: $order,
    clock: sendOrder,
    target: sendOrderFx
});

forward({
    from: sendOrderFx.done,
    to: orderSent
});
