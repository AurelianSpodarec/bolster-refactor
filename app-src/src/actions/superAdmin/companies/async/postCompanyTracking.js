import {
    POST_COMPANY_TRACKING_REQUEST,
    POST_COMPANY_TRACKING_SUCCESS,
    POST_COMPANY_TRACKING_FAILURE,
} from 'constants/actionTypes/companies';
import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const postCompanyTrackingRequest = () => ({
    type: POST_COMPANY_TRACKING_REQUEST,
});

export const postCompanyTrackingSuccess = (payload, updatedInfo) => ({
    type: POST_COMPANY_TRACKING_SUCCESS,
    payload,
    updatedInfo,
});

export const postCompanyTrackingFailure = error => ({
    type: POST_COMPANY_TRACKING_FAILURE,
    error,
});

export default ({ ContactPeriod, Contacted, CompanyId }) => dispatch => {
    dispatch(postCompanyTrackingRequest());

    return axios
        .post(
            `${ADMIN_API_URL}/companies/subscriptions/contacted`,
            { ContactPeriod, Contacted, CompanyId },
            getHeaders(),
        )
        .then(res =>
            dispatch(postCompanyTrackingSuccess(res.data, { ContactPeriod, Contacted, CompanyId })),
        )
        .catch(err => dispatch(postCompanyTrackingFailure(err.message)));
};
