import axios from 'axios';

import {
    RESTORE_OPERATIVE_PERMISSION_REQUEST,
    RESTORE_OPERATIVE_PERMISSION_SUCCESS,
    RESTORE_OPERATIVE_PERMISSION_FAILURE,
} from 'constants/actionTypes/deletedData';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const restoreOperativeRequest = () => ({
    type: RESTORE_OPERATIVE_PERMISSION_REQUEST,
});

export const restoreOperativeSuccess = id => ({
    type: RESTORE_OPERATIVE_PERMISSION_SUCCESS,
    id,
});

export const restoreOperativeFailure = error => ({
    type: RESTORE_OPERATIVE_PERMISSION_FAILURE,
    error,
});

export default companyOperativePermissionID => dispatch => {
    dispatch(restoreOperativeRequest());
    axios
        .delete(
            `${API_URL}/operativepermissions/${companyOperativePermissionID}?undo=true`,
            getHeaders(),
        )
        .then(() => dispatch(restoreOperativeSuccess(companyOperativePermissionID)))
        .catch(err => dispatch(restoreOperativeFailure(err.message)));
};
