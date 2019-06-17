import { ADD_RECTANGLE } from 'constants/actionTypes/reports';

export default (id, topLeft, bottomRight) => dispatch =>
    dispatch({
        type: ADD_RECTANGLE,
        id,
        topLeft,
        bottomRight
    });
