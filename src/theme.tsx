import {PALETTE} from './colorPalette'
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: PALETTE.blue4,
        },
        secondary: {
            main: PALETTE.light2,
        },
        error: {
            main: PALETTE.red4,
        },
        text: {
            primary: PALETTE.light1,
            secondary: PALETTE.light2
        }
    }
});

export default theme;
