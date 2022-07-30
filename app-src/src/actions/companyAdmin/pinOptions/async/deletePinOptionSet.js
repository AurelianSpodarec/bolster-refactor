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

export const deletePinOptionSetSuccess = id => ({
    type: DELETE_PIN_OPTION_SET_SUCCESS,
    id,
});

export const deletePinOptionSetFailure = error => ({
    type: DELETE_PIN_OPTION_SET_FAILURE,
    error,
});

export default setID => async dispatch => {
    dispatch(deletePinOptionSetRequest());

    return axios
        .delete(`${API_URL}/pinoptions/sets/${setID}`, getHeaders())
        .then(() => dispatch(deletePinOptionSetSuccess(setID)))
        .catch(err => dispatch(deletePinOptionSetFailure(err.message)));
};
