/* Libraries */
import { AnyAction } from 'redux';

/* Types */
import { ReduxActionType, StateSource } from '../type/Redux';

function getInitialState (): StateSource {
    return {
        data: null
    };
}

export default function (state: StateSource = getInitialState(), action: AnyAction): StateSource {
    switch (action.type) {
        case ReduxActionType.SOURCE_SET_DATA: {
            return { ...state, data: action.data };
        }
        default: return state;
    }
}
