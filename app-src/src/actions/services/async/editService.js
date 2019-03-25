import {
    EDIT_SERVICE_REQUEST,
    EDIT_SERVICE_SUCCESS,
    EDIT_SERVICE_FAILURE
} from 'constants/actionTypes/services';
import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import setAPIFieldErrors from 'actions/generic/fieldErrors/sync/setAPIFieldErrors';

export const editServiceRequest = (id, name) => ({
    type: EDIT_SERVICE_REQUEST,
    id: id.toString(),
    name
});

export const editServiceSuccess = () => ({
    type: EDIT_SERVICE_SUCCESS
});
export const editServiceFailure = error => ({
    type: EDIT_SERVICE_FAILURE,
    error
});

export default (id, name) => dispatch => {
    dispatch(editServiceRequest(id, name));
    // ?
    axios
        .post(`${ADMIN_API_URL}/services/${id}`, {
            id,
            name
        })
        .then(() => {
            dispatch(editServiceSuccess());
        })
        .catch(error => {
            dispatch(editServiceFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
