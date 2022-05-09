import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DELETE_PIN_OPTION_SET_REQUEST,
    DELETE_PIN_OPTION_SET_SUCCESS,
    DELETE_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const deletePinOptionSetRequest = () => ({
    type: DELETE_PIN_OPTION_SET_REQUEST,
});

export const deletePinOptionSetSuccess = payload => ({
    type: DELETE_PIN_OPTION_SET_SUCCESS,
    payload,
});

export const deletePinOptionSetFailure = error => ({
    type: DELETE_PIN_OPTION_SET_FAILURE,
    error,
});

export default set => async dispatch => {
    dispatch(deletePinOptionSetRequest());

    return axios
        .delete(`${API_URL}/pinoptions/sets/${set.id}`, getHeaders())
        .then(() => dispatch(deletePinOptionSetSuccess(set)))
        .catch(err => dispatch(deletePinOptionSetFailure(err.message)));
};
