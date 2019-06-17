import { REMOVE_FILTER_QUESTION } from 'constants/actionTypes/reports';

export default id => async dispatch =>
    await dispatch({
        type: REMOVE_FILTER_QUESTION,
        id
    });
