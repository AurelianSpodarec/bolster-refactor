import { REMOVE_FILTER_QUESTION } from 'constants/actionTypes/reports';

export default id => dispatch =>
    dispatch({
        type: REMOVE_FILTER_QUESTION,
        id
    });
