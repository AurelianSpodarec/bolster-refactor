import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    SET_OPTION_SET_AS_NOT_HIDDEN_REQUEST,
    SET_OPTION_SET_AS_NOT_HIDDEN_SUCCESS,
    SET_OPTION_SET_AS_NOT_HIDDEN_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const setOptionSetAsNotHiddenRequest = payload => ({
    type: SET_OPTION_SET_AS_NOT_HIDDEN_REQUEST,
    payload,
});

export const setOptionSetAsNotHiddenSuccess = payload => ({
    type: SET_OPTION_SET_AS_NOT_HIDDEN_SUCCESS,
    payload,
});

export const setOptionSetAsNotHiddenFailure = (error, payload) => ({
    type: SET_OPTION_SET_AS_NOT_HIDDEN_FAILURE,
    error,
    payload,
});

export default set => async dispatch => {
    dispatch(setOptionSetAsNotHiddenRequest(set));

    return axios
        .patch(`${API_URL}/pinoptions/sets/${set.id}/hide?undo=true`, null, getHeaders())
        .then(res => dispatch(setOptionSetAsNotHiddenSuccess(res.data)))
        .catch(err => dispatch(setOptionSetAsNotHiddenFailure(err.message, set)));
};
