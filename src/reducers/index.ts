/* Libraries */
import { combineReducers } from 'redux';

/* Application files */
import source from './source';
import ui from './ui';

export default combineReducers({
    source,
    ui
});
