import { CLEAR_SEARCH_RESULTS } from 'constants/actionTypes/search';

export default () => dispatch =>
    dispatch({
        type: CLEAR_SEARCH_RESULTS,
    });
