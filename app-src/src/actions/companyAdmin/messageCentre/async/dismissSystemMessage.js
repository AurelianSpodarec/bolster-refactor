import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_SYSTEM_MESSAGE_REQUEST,
    DISMISS_SYSTEM_MESSAGE_SUCCESS,
    DISMISS_SYSTEM_MESSAGE_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissSystemMessageRequest = id => ({
    type: DISMISS_SYSTEM_MESSAGE_REQUEST,
    id,
});

export const dismissSystemMessageSuccess = () => ({
    type: DISMISS_SYSTEM_MESSAGE_SUCCESS,
});

export const dismissSystemMessageFailure = (id, error) => ({
    type: DISMISS_SYSTEM_MESSAGE_FAILURE,
    id,
    error,
});

export default id => dispatch => {
    dispatch(dismissSystemMessageRequest(id));

    return axios
        .delete(`${API_URL}/systemMessages/${id}`, null, getHeaders())
        .then(() => dispatch(dismissSystemMessageSuccess()))
        .catch(err => dispatch(dismissSystemMessageFailure(id, err.message)));
};
