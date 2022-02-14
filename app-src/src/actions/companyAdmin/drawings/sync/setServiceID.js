import { SET_SERVICE_ID } from 'constants/actionTypes/drawings';

export default serviceID => dispatch =>
    dispatch({
        type: SET_SERVICE_ID,
        serviceID,
    });
