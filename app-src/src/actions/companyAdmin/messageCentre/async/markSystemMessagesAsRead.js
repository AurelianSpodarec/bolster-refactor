import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import { POST_MARK_SYSTEM_MESSAGES_AS_READ_SUCCESS } from 'constants/actionTypes/messageCentre';

export const markSystemMessagesAsReadSuccess = payload => ({
    type: POST_MARK_SYSTEM_MESSAGES_AS_READ_SUCCESS,
    payload,
});

export default () => dispatch => {
    return axios
        .post(`${API_URL}/systemMessages/readall`, null, getHeaders())
        .then(res => dispatch(markSystemMessagesAsReadSuccess(res.data)))
        .catch(err => console.log(err));
};
