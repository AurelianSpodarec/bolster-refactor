import { combineReducers } from 'redux';

import { TOGGLE_COLOUR_THEME, CONFIRM_DARK_THEME } from '../../constants/shared/colourTheme';
import { FETCH_PROFILE_SUCCESS } from '../../constants/actionTypes/profile';

export default combineReducers({
    isDarkModeEnabled: colourThemeReducer,
    confirmDarkTheme: confirmDarkThemeReducer,
});

function colourThemeReducer(state = null, action) {
    switch (action.type) {
        case TOGGLE_COLOUR_THEME:
            return action.value;
        case FETCH_PROFILE_SUCCESS:
            return action.payload.isDarkModeEnabled;
        default:
            return state;
    }
}

function confirmDarkThemeReducer(state = false, action) {
    switch (action.type) {
        case CONFIRM_DARK_THEME:
            return true;
        default:
            return state;
    }
}
