import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#a5d6a7',
        },
        secondary: {
            main: '#ff7043',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#eceff1',
        },
    },
});

export default theme;
