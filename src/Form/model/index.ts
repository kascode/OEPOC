import { createEffect, createEvent, createStore } from 'effector-logger';
import { $order } from './order';
import Api from '../api';

enum EditorModes {
    shifts = 'mode_shifts',
    period = 'mode_period'
}

const fetchOrderFx = createEffect({
    handler: Api.fetchOrder
});

const editorModeChanged = createEvent<EditorModes>('editor_mode_changed');

const $editorMode = createStore(EditorModes.shifts)
    .on(editorModeChanged, (_, payload) => payload);
const $periodEnabled = $order.map(order => order.shiftGroups.length === 0);

export { editorModeChanged, $editorMode, EditorModes, $periodEnabled, fetchOrderFx };
