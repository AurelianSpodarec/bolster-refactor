import { UPDATE_OPERATIVE_FILTER } from 'constants/actionTypes/reports';

export default value => dispatch =>
    dispatch({
        type: UPDATE_OPERATIVE_FILTER,
        value
    });
