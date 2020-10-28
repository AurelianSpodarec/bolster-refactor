import { TOGGLE_IS_SORTING } from 'constants/actionTypes/generic';

export default () => dispatch =>
    dispatch({
        type: TOGGLE_IS_SORTING,
    });
