import { UPDATE_FLOORS_FILTERS } from 'constants/actionTypes/floors';

export default (fieldName, value) => dispatch =>
    dispatch({
        type: UPDATE_FLOORS_FILTERS,
        fieldName,
        value,
    });
