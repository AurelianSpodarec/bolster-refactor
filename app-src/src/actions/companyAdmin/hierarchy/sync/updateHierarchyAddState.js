import { UPDATE_HIERARCHY_ADD_STATE } from 'constants/actionTypes/hierarchy';

export default value => dispatch =>
    dispatch({
        type: UPDATE_HIERARCHY_ADD_STATE,
        value
    });
