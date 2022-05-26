import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    MERGE_PIN_OPTION_SETS_REQUEST,
    MERGE_PIN_OPTION_SETS_SUCCESS,
    MERGE_PIN_OPTION_SETS_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const mergePinOptionSetsRequest = () => ({
    type: MERGE_PIN_OPTION_SETS_REQUEST,
});

export const mergePinOptionSetsSuccess = (mergedSetID, payload) => ({
    type: MERGE_PIN_OPTION_SETS_SUCCESS,
    mergedSetID,
    payload,
});

export const mergePinOptionSetsFailure = error => ({
    type: MERGE_PIN_OPTION_SETS_FAILURE,
    error,
});

export default (mergedSetID, postBody) => async dispatch => {
    dispatch(mergePinOptionSetsRequest());

    return axios
        .post(`${API_URL}/pinoptions/sets/merge`, postBody, getHeaders())
        .then(res => dispatch(mergePinOptionSetsSuccess(mergedSetID, res.data)))
        .catch(err => {
            dispatch(handleErrors(mergePinOptionSetsFailure)(err));
        });
};
