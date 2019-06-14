import axios from 'axios';
import {
    GOOGLE_MAPS_GEOCODE_URL,
    GOOGLE_MAPS_GEOCODE_API_KEY
} from 'constants/companyAdmin/googleGeocoding';

import {
    FETCH_ALL_APPROVED_COMPANIES_GEOCODE_REQUEST,
    FETCH_ALL_APPROVED_COMPANIES_GEOCODE_SUCCESS,
    FETCH_ALL_APPROVED_COMPANIES_GEOCODE_FAILURE
} from 'constants/actionTypes/approvedCompanies';

export const fetchAllApprovedCompaniesGeocodeRequest = () => ({
    type: FETCH_ALL_APPROVED_COMPANIES_GEOCODE_REQUEST
});

export const fetchAllApprovedCompaniesGeocodeSuccess = payload => ({
    type: FETCH_ALL_APPROVED_COMPANIES_GEOCODE_SUCCESS,
    payload
});

export const fetchAllApprovedCompaniesGeocodeFailure = error => ({
    type: FETCH_ALL_APPROVED_COMPANIES_GEOCODE_FAILURE,
    error
});

export default address => dispatch => {
    dispatch(fetchAllApprovedCompaniesGeocodeRequest());

    return axios
        .get(
            `${GOOGLE_MAPS_GEOCODE_URL}/${address}&key=${GOOGLE_MAPS_GEOCODE_API_KEY}`
        )
        .then(res =>
            dispatch(fetchAllApprovedCompaniesGeocodeSuccess(res.data))
        )
        .catch(err =>
            dispatch(fetchAllApprovedCompaniesGeocodeFailure(err.message))
        );
};
