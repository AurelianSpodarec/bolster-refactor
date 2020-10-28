import { SET_IS_SORTING } from 'constants/actionTypes/generic';

export default isSorting => dispatch =>
    dispatch({
        type: SET_IS_SORTING,
        isSorting,
    });
