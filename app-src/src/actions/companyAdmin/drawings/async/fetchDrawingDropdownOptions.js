import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST,
    FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS,
    FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE
} from 'constants/actionTypes/drawings';

export const fetchDrawingDropdownOptionsRequest = () => ({
    type: FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST
});

export const fetchDrawingDropdownOptionsSuccess = payload => ({
    type: FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS,
    payload
});

export const fetchDrawingDropdownOptionsFailure = error => ({
    type: FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(fetchDrawingDropdownOptionsRequest());

    return axios
        .get(
            `${API_URL}/drawings/${drawingID}/usabledropdownoptions`,
            getHeaders()
        )
        .then(res => dispatch(fetchDrawingDropdownOptionsSuccess(res.data)))
        .catch(err =>
            dispatch(fetchDrawingDropdownOptionsFailure(err.message))
        );
};
