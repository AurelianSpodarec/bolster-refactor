import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import { POST_MARK_COMPANY_ALERTS_AS_READ_SUCCESS } from 'constants/actionTypes/messageCentre';

export const markCompanyAlertsAsReadSuccess = payload => ({
    type: POST_MARK_COMPANY_ALERTS_AS_READ_SUCCESS,
    payload,
});

export default () => dispatch => {
    return axios
        .post(`${API_URL}/alertMessages/readall`, null, getHeaders())
        .then(res => dispatch(markCompanyAlertsAsReadSuccess(res.data)))
        .catch(err => console.log(err));
};
