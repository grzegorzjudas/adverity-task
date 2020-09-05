/* Libraries */
import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

export default createMuiTheme({
    palette: {
        primary: {
            light: blue[300],
            main: blue[800],
            dark: blue[900]
        }
    }
});
