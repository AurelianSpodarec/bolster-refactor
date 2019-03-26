import { UPDATE_USERS_FILTERS } from 'constants/actionTypes/users';

export default (fieldName, searchTerm) => dispatch =>
    dispatch({
        type: UPDATE_USERS_FILTERS,
        fieldName,
        searchTerm
    });
