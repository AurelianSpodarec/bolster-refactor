import { UPDATE_SELECTED_PINS } from 'constants/actionTypes/reports';

export default pins => dispatch =>
    dispatch({
        type: UPDATE_SELECTED_PINS,
        pins
    });
