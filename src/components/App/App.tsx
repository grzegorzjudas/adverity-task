/* Libraries */
import React from 'react';
import { Theme, ThemeProvider } from '@material-ui/core';
import { createStore, applyMiddleware, Store, compose } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';

/* Types */
import { State } from '../../type/Redux';

/* Application files */
import reducers from '../../reducers';
import Dashboard from '../Dashboard';

type Props = {
    theme: Theme;
}

export function App (props: Props) {
    const store: Store<State> = createStore(reducers, {}, compose(applyMiddleware(Thunk)));

    return (
        <Provider store={store}>
            <ThemeProvider theme={props.theme}>
                <Dashboard />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
