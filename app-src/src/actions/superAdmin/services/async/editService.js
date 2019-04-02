import {
    EDIT_SERVICE_REQUEST,
    EDIT_SERVICE_SUCCESS,
    EDIT_SERVICE_FAILURE
} from 'constants/actionTypes/services';
import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

export const editServiceRequest = (id, name) => ({
    type: EDIT_SERVICE_REQUEST,
    id: id.toString(),
    name
});

export const editServiceSuccess = payload => ({
    type: EDIT_SERVICE_SUCCESS,
    payload
});
export const editServiceFailure = error => ({
    type: EDIT_SERVICE_FAILURE,
    error
});

export default (id, name) => dispatch => {
    dispatch(editServiceRequest(id, name));
    // ?
    axios
        .post(
            `${ADMIN_API_URL}/services/${id}`,
            {
                id,
                name
            },
            getHeaders()
        )
        .then(({ data }) => {
            dispatch(editServiceSuccess(data));
        })
        .catch(err => {
            dispatch(editServiceFailure(err.message));

            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
