import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_SINGLE_FLOOR_REQUEST,
    CLIENT_FETCH_SINGLE_FLOOR_SUCCESS,
    CLIENT_FETCH_SINGLE_FLOOR_FAILURE
} from 'constants/client/actionTypes/clientFloors';

export const clientFetchSingleFloorRequest = () => ({
    type: CLIENT_FETCH_SINGLE_FLOOR_REQUEST
});

export const clientFetchSingleFloorSuccess = payload => ({
    type: CLIENT_FETCH_SINGLE_FLOOR_SUCCESS,
    payload
});

export const clientFetchSingleFloorFailure = error => ({
    type: CLIENT_FETCH_SINGLE_FLOOR_FAILURE,
    error
});

export default (companyID, floorID) => dispatch => {
    dispatch(clientFetchSingleFloorRequest());

    return (
        axios
            // ! change this url
            .get(
                `${CLIENT_API_URL}/floors/${companyID}/${floorID}`,
                getHeaders()
            )
            .then(res => dispatch(clientFetchSingleFloorSuccess(res.data)))
            .catch(err => dispatch(clientFetchSingleFloorFailure(err.message)))
    );
};
