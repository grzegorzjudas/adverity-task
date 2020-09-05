/* Libraries */
import { AnyAction } from 'redux';

/* Types */
import { ReduxActionType, StateUI } from '../type/Redux';

function getInitialState (): StateUI {
    return {
        loading: false
    };
}

export default function (state: StateUI = getInitialState(), action: AnyAction): StateUI {
    switch (action.type) {
        case ReduxActionType.UI_SET_LOADING: {
            if (state.loading === action.loading) return state;

            return { ...state, loading: action.loading };
        }
        default: return state;
    }
}
