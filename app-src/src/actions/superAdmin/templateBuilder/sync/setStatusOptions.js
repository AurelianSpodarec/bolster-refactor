import { SET_STATUS_OPTIONS } from 'constants/actionTypes/templateBuilder';

export default (statusOptions, templateUUID) => dispatch =>
    dispatch({
        type: SET_STATUS_OPTIONS,
        statusOptions,
        templateUUID
    });
