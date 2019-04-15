import {
    EDIT_TEMPLATE_QUESTION_REQUEST,
    EDIT_TEMPLATE_QUESTION_SUCCESS,
    EDIT_TEMPLATE_QUESTION_FAILURE
} from 'constants/actionTypes/templates';
import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const editTemplateQuestionRequest = () => ({
    type: EDIT_TEMPLATE_QUESTION_REQUEST
});

export const editTemplateQuestionSuccess = payload => ({
    type: EDIT_TEMPLATE_QUESTION_SUCCESS,
    payload
});

export const editTemplateQuestionFailure = error => ({
    type: EDIT_TEMPLATE_QUESTION_FAILURE,
    error
});

export default (questionID, postBody) => dispatch => {
    dispatch(editTemplateQuestionRequest());
    axios
        .post(
            `${API_URL}/templates/${questionID}/options`,
            postBody,
            getHeaders()
        )
        .then(({ data }) => dispatch(editTemplateQuestionSuccess(data)))
        .catch(err => {
            const errorAction = handleErrors(editTemplateQuestionFailure);
            dispatch(errorAction(err));
        });
};
