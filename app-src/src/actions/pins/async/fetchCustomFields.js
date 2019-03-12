import axios from 'axios';

import {
    FETCH_CUSTOM_FIELDS_REQUEST,
    FETCH_CUSTOM_FIELDS_SUCCESS,
    FETCH_CUSTOM_FIELDS_FAILURE
} from 'constants/actionTypes/pins';

export const fetchCustomFieldsRequest = () => ({
    type: FETCH_CUSTOM_FIELDS_REQUEST
});

export const fetchCustomFieldsSuccess = payload => ({
    type: FETCH_CUSTOM_FIELDS_SUCCESS,
    payload
});

export const fetchCustomFieldsFailure = error => ({
    type: FETCH_CUSTOM_FIELDS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCustomFieldsRequest());

    axios
        .get('/mockData/pins/pinCustomFields.json')
        .then(res => dispatch(fetchCustomFieldsSuccess(res.data)))
        .catch(err => dispatch(fetchCustomFieldsFailure(err.message)));
};
