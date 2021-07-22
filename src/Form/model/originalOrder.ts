import { createStore } from 'effector-logger';
import { OrderDetailsForEditor } from '../helpers';

const $originalOrder = createStore<OrderDetailsForEditor | null>(null);

export { $originalOrder };
