/* Types */
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SourceItem } from './Source';

export enum ReduxActionType {
    UI_SET_LOADING = 'UI_SET_LOADING',
    SOURCE_SET_DATA = 'SOURCE_SET_DATA'
}

export type StateUI = {
    loading: boolean;
}

export type StateSource = {
    data: SourceItem[];
}

export type State = {
    ui: StateUI;
    source: StateSource;
}

export type ReduxThunkAction<T> = ThunkAction<Promise<T>, State, undefined, Action<ReduxActionType>>;
