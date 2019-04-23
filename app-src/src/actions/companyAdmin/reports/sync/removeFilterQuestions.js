import { REMOVE_FILTER_QUESTIONS } from 'constants/actionTypes/reports';

export default () => dispatch =>
    dispatch({
        type: REMOVE_FILTER_QUESTIONS
    });
