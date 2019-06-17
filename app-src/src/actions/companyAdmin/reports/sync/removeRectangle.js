import { REMOVE_RECTANGLE } from 'constants/actionTypes/reports';

export default id => dispatch =>
    dispatch({
        type: REMOVE_RECTANGLE,
        id
    });
