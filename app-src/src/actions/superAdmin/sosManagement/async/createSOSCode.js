import axios from 'axios';

import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_SOS_CODE_REQUEST,
    CREATE_SOS_CODE_SUCCESS,
    CREATE_SOS_CODE_FAILURE
} from 'constants/actionTypes/superAdminSOSCodes';
import { ADMIN_API_URL } from 'config';

export const createSOSCodeRequest = () => ({
    type: CREATE_SOS_CODE_REQUEST
});

export const createSOSCodeSuccess = payload => ({
    type: CREATE_SOS_CODE_SUCCESS,
    payload
});

export const createSOSCodeFailure = error => ({
    type: CREATE_SOS_CODE_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createSOSCodeRequest());

    axios
        .post(`${ADMIN_API_URL}/sos/new`, postBody, getHeaders())
        .then(result => dispatch(createSOSCodeSuccess(result.data)))
        .catch(error => {
            dispatch(createSOSCodeFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
