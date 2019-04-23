import { ADD_FILTER_QUESTION } from 'constants/actionTypes/reports';

export default id => dispatch =>
    console.log(id) ||
    dispatch({
        type: ADD_FILTER_QUESTION,
        id
    });
