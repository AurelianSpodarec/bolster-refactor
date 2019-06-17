import { REMOVE_ALL_RECTANGLES } from 'constants/actionTypes/reports';

export default () => dispatch =>
    dispatch({
        type: REMOVE_ALL_RECTANGLES
    });
