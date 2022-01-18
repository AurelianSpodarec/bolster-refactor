import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    DISMISS_SYSTEM_MESSAGE_REQUEST,
    DISMISS_SYSTEM_MESSAGE_SUCCESS,
    DISMISS_SYSTEM_MESSAGE_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissSystemMessageRequest = () => ({
    type: DISMISS_SYSTEM_MESSAGE_REQUEST,
});

export const dismissSystemMessageSuccess = payload => ({
    type: DISMISS_SYSTEM_MESSAGE_SUCCESS,
    payload,
});

export const dismissSystemMessageFailure = error => ({
    type: DISMISS_SYSTEM_MESSAGE_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(dismissSystemMessageRequest());

    return axios
        .delete(`${API_URL}/systemMessages/${id}`, getHeaders())
        .then(() => dispatch(dismissSystemMessageSuccess(id)))
        .catch(err => dispatch(handleErrors)(err));
};
