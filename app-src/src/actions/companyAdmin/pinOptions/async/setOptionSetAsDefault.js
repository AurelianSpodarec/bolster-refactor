import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    SET_OPTION_SET_AS_DEFAULT_REQUEST,
    SET_OPTION_SET_AS_DEFAULT_SUCCESS,
    SET_OPTION_SET_AS_DEFAULT_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const setOptionSetAsDefaultRequest = (newDefaultSet, oldDefaultSet) => ({
    type: SET_OPTION_SET_AS_DEFAULT_REQUEST,
    newDefaultSet,
    oldDefaultSet,
});

export const setOptionSetAsDefaultSuccess = payload => ({
    type: SET_OPTION_SET_AS_DEFAULT_SUCCESS,
    payload,
});

export const setOptionSetAsDefaultFailure = (error, newDefaultSet, oldDefaultSet) => ({
    type: SET_OPTION_SET_AS_DEFAULT_FAILURE,
    error,
    newDefaultSet,
    oldDefaultSet,
});

export default (newDefaultSet, oldDefaultSet) => async dispatch => {
    dispatch(setOptionSetAsDefaultRequest(newDefaultSet, oldDefaultSet));

    return axios
        .post(`${API_URL}/pinoptions/sets/${newDefaultSet.id}/default`, null, getHeaders())
        .then(res => dispatch(setOptionSetAsDefaultSuccess(res.data)))
        .catch(err =>
            dispatch(setOptionSetAsDefaultFailure(err.message, newDefaultSet, oldDefaultSet)),
        );
};
