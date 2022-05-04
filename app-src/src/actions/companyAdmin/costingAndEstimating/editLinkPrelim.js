import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_LINK_PRELIM_FAILURE,
    EDIT_LINK_PRELIM_REQUEST,
    EDIT_LINK_PRELIM_SUCCESS,
} from 'constants/actionTypes/prelims';

export const editLinkPrelimRequest = () => ({
    type: EDIT_LINK_PRELIM_REQUEST,
});

export const editLinkPrelimSuccess = payload => ({
    type: EDIT_LINK_PRELIM_SUCCESS,
    payload,
});

export const editLinkPrelimFailure = error => ({
    type: EDIT_LINK_PRELIM_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(editLinkPrelimRequest());

    axios
        .patch(`${API_URL}/costingandestimating/editcustomprelim`, postBody, getHeaders())
        .then(result => dispatch(editLinkPrelimSuccess(result.data)))
        .catch(error => {
            dispatch(editLinkPrelimFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
