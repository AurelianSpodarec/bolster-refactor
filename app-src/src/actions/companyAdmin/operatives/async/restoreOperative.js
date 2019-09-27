import axios from 'axios';

import {
    RESTORE_OPERATIVE_REQUEST,
    RESTORE_OPERATIVE_SUCCESS,
    RESTORE_OPERATIVE_FAILURE
} from 'constants/actionTypes/deletedData';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const restoreOperativeRequest = () => ({
    type: RESTORE_OPERATIVE_REQUEST
});

export const restoreOperativeSuccess = id => ({
    type: RESTORE_OPERATIVE_SUCCESS,
    id
});

export const restoreOperativeFailure = error => ({
    type: RESTORE_OPERATIVE_FAILURE,
    error
});

export default operativeID => dispatch => {
    dispatch(restoreOperativeRequest());
    return axios
        .delete(`${API_URL}/operatives/${operativeID}?undo=true`, getHeaders())
        .then(() => dispatch(restoreOperativeSuccess(operativeID)))
        .catch(err => dispatch(restoreOperativeFailure(err.message)));
};
