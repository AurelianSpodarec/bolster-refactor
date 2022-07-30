import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_SITE_PIN_OPTION_SETS_REQUEST,
    EDIT_SITE_PIN_OPTION_SETS_SUCCESS,
    EDIT_SITE_PIN_OPTION_SETS_FAILURE,
} from 'constants/actionTypes/sites';

export const editSitePinOptionSetsRequest = () => ({
    type: EDIT_SITE_PIN_OPTION_SETS_REQUEST,
});

export const editSitePinOptionSetsSuccess = payload => ({
    type: EDIT_SITE_PIN_OPTION_SETS_SUCCESS,
    payload,
});

export const editSitePinOptionSetsFailure = error => ({
    type: EDIT_SITE_PIN_OPTION_SETS_FAILURE,
    error,
});

export default (siteID, postBody) => dispatch => {
    dispatch(editSitePinOptionSetsRequest());

    axios
        .post(`${API_URL}/sites/${siteID}/pinOptionSets`, postBody, getHeaders())
        .then(result => dispatch(editSitePinOptionSetsSuccess(result.data)))
        .catch(error => {
            dispatch(editSitePinOptionSetsFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
