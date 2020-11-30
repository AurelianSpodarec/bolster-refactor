import axios from 'axios';

import {
    POST_REGISTER_STEP_VALIDATION_REQUEST,
    POST_REGISTER_STEP_VALIDATION_SUCCESS,
    POST_REGISTER_STEP_VALIDATION_FAILURE,
} from 'constants/actionTypes/auth';
import { getHeaders, handleErrors } from 'helpers/api';
import { AUTH_API_URL } from 'config';

export const postRegisterStepValidationRequest = () => ({
    type: POST_REGISTER_STEP_VALIDATION_REQUEST,
});

export const postRegisterStepValidationSuccess = payload => ({
    type: POST_REGISTER_STEP_VALIDATION_SUCCESS,
    payload,
});

export const postRegisterStepValidationFailure = error => ({
    type: POST_REGISTER_STEP_VALIDATION_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postRegisterStepValidationRequest());

    axios
        .post(`${AUTH_API_URL}/auth/registerStep1Validate`, postBody, getHeaders())
        .then(res => dispatch(postRegisterStepValidationSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postRegisterStepValidationFailure)(err)));
};
