import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    PATCH_CLOCKER_ENTRY_REQUEST,
    PATCH_CLOCKER_ENTRY_FAILURE,
    PATCH_CLOCKER_ENTRY_SUCCESS,
} from 'constants/actionTypes/timesheets';

export const patchClockerEntryRequest = () => ({
    type: PATCH_CLOCKER_ENTRY_REQUEST,
});

export const patchClockerEntrySuccess = payload => ({
    type: PATCH_CLOCKER_ENTRY_SUCCESS,
    payload,
});

export const patchClockerEntryFailure = error => ({
    type: PATCH_CLOCKER_ENTRY_FAILURE,
    error,
});

export default postBody => async dispatch => {
    dispatch(patchClockerEntryRequest());

    return axios
        .patch(`${API_URL}/clockerEntries/ammend`, postBody, getHeaders())
        .then(res => dispatch(patchClockerEntrySuccess(res.data)))
        .catch(err => dispatch(patchClockerEntryFailure(err.message)));
};
