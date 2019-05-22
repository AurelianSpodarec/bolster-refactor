import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST,
    CLIENT_FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS,
    CLIENT_FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE
} from 'constants/client/actionTypes/clientDrawings';

export const clientFetchDrawingDropdownOptionsRequest = () => ({
    type: CLIENT_FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST
});

export const clientFetchDrawingDropdownOptionsSuccess = payload => ({
    type: CLIENT_FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS,
    payload
});

export const clientFetchDrawingDropdownOptionsFailure = error => ({
    type: CLIENT_FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(clientFetchDrawingDropdownOptionsRequest());

    axios
        // ! change the url
        .get(
            `${API_URL}/drawings/${drawingID}/usabledropdownoptions`,
            getHeaders()
        )
        .then(res =>
            dispatch(clientFetchDrawingDropdownOptionsSuccess(res.data))
        )
        .catch(err =>
            dispatch(clientFetchDrawingDropdownOptionsFailure(err.message))
        );
};
