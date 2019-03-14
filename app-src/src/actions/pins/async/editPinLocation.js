import {
    EDIT_PIN_LOCATION_REQUEST,
    EDIT_PIN_LOCATION_SUCCESS,
    EDIT_PIN_LOCATION_FAILURE
} from 'constants/actionTypes/pins';

export const editLocationRequest = (id, lat, lng) => ({
    type: EDIT_PIN_LOCATION_REQUEST,
    id: id.toString(),
    lat,
    lng
});

// success and failure need plugging into the reducer
export const editLocationSuccess = () => ({
    type: EDIT_PIN_LOCATION_SUCCESS
});

export const editLocationFailure = payload => ({
    type: EDIT_PIN_LOCATION_FAILURE,
    payload
});

export default (id, lat, lng) => dispatch => {
    dispatch(editLocationRequest(id, lat, lng));

    // dispatch(editLocationSuccess());
    // dispatch(editLocationFailure());
};
