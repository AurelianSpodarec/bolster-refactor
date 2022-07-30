import axios from 'axios';

import { API_URL } from 'config/index';
import {
    DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE,
    DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST,
    DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS,
} from 'constants/actionTypes/prelims';
import { getHeaders } from 'helpers/api';

export const deleteCostingAndEstimatingPrelimRequest = () => ({
    type: DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST,
});

export const deleteCostingAndEstimatingPrelimSuccess = id => ({
    type: DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS,
    id,
});

export const deleteCostingAndEstimatingPrelimFailure = error => ({
    type: DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deleteCostingAndEstimatingPrelimRequest());

    return axios
        .delete(`${API_URL}/prelims/${id}`, getHeaders())
        .then(() => dispatch(deleteCostingAndEstimatingPrelimSuccess(id)))
        .catch(error => dispatch(deleteCostingAndEstimatingPrelimFailure(error)));
};
