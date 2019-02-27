import { SET_SITES_FILTER_STATUS } from 'constants/actionTypes/sites';

export default status => dispatch =>
    dispatch({
        type: SET_SITES_FILTER_STATUS,
        status
    });
