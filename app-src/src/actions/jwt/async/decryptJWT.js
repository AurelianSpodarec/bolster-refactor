import axios from 'axios';
// import { getDecodedJWT } from 'helpers/api';
// getDecodedJWT().then(function(value) {
//     console.log(value);
// });
import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE
} from 'constants/actionTypes/profile';

export const fetchProfileRequest = () => ({
    type: FETCH_PROFILE_REQUEST
});

export const fetchProfileSuccess = payload => ({
    type: FETCH_PROFILE_SUCCESS,
    payload
});

export const fetchProfileFailure = error => ({
    type: FETCH_PROFILE_FAILURE,
    error
});

export default () => dispatch => {
    axios
        .get('/mockData/profile/profile.json')
        .then(res => dispatch(fetchProfileSuccess(res.data)))
        .catch(err => dispatch(fetchProfileFailure(err.message)));
};
