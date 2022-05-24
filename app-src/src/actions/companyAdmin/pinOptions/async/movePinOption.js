import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    MOVE_PIN_OPTION_REQUEST,
    MOVE_PIN_OPTION_SUCCESS,
    MOVE_PIN_OPTION_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const movePinOptionRequest = () => ({
    type: MOVE_PIN_OPTION_REQUEST,
});

export const movePinOptionSuccess = id => ({
    type: MOVE_PIN_OPTION_SUCCESS,
    id,
});

export const movePinOptionFailure = error => ({
    type: MOVE_PIN_OPTION_FAILURE,
    error,
});

export default (optionID, setID, name) => async dispatch => {
    dispatch(movePinOptionRequest());

    return axios
        .post(
            `${API_URL}/pinoptions/options/${optionID}/moveToSet/${setID}`,
            { name },
            getHeaders(),
        )
        .then(() => dispatch(movePinOptionSuccess(optionID)))
        .catch(err => dispatch(handleErrors(movePinOptionFailure)(err)));
};
