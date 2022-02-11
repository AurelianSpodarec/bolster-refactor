import { SET_SERVICE_FILTERS } from 'constants/actionTypes/services';

export default serviceFilterType => dispatch =>
    dispatch({
        type: SET_SERVICE_FILTERS,
        serviceFilterType,
    });
