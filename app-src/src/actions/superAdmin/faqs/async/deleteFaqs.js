import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    DELETE_FAQS_REQUEST,
    DELETE_FAQS_SUCCESS,
    DELETE_FAQS_FAILURE,
} from 'constants/actionTypes/faqs';

export const deleteFaqsRequest = () => ({
    type: DELETE_FAQS_REQUEST,
});

export const deleteFaqsSuccess = (id, payload) => ({
    type: DELETE_FAQS_SUCCESS,
    id,
    payload,
});

export const deleteFaqsFailure = error => ({
    type: DELETE_FAQS_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deleteFaqsRequest());

    axios
        .delete(`${ADMIN_API_URL}/apphelp/${id}`, getHeaders())
        .then(res => dispatch(deleteFaqsSuccess(id, res.data)))
        .catch(err => dispatch(deleteFaqsFailure(err.message)));
};
