import { TOGGLE_COLOUR_THEME } from '../../../constants/shared/colourTheme';

export const setIsDarkModeEnabled = value => ({
    type: TOGGLE_COLOUR_THEME,
    value,
});
