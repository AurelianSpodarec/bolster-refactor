import { ADD_FILTER_QUESTION } from 'constants/actionTypes/reports';

export default id => dispatch =>
    dispatch({
        type: ADD_FILTER_QUESTION,
        id
    });
