import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    UNSET_OPTION_SET_AS_DEFAULT_REQUEST,
    UNSET_OPTION_SET_AS_DEFAULT_SUCCESS,
    UNSET_OPTION_SET_AS_DEFAULT_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const unsetOptionSetAsDefaultRequest = () => ({
    type: UNSET_OPTION_SET_AS_DEFAULT_REQUEST,
});

export const unsetOptionSetAsDefaultSuccess = payload => ({
    type: UNSET_OPTION_SET_AS_DEFAULT_SUCCESS,
    payload,
});

export const unsetOptionSetAsDefaultFailure = error => ({
    type: UNSET_OPTION_SET_AS_DEFAULT_FAILURE,
    error,
});

export default set => async dispatch => {
    dispatch(unsetOptionSetAsDefaultRequest());

    return axios
        .post(`${API_URL}/pinoptions/sets/${set.id}/unsetdefault`, null, getHeaders())
        .then(res => dispatch(unsetOptionSetAsDefaultSuccess(res.data)))
        .catch(err => dispatch(unsetOptionSetAsDefaultFailure(err.message)));
};
