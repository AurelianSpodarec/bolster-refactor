import { SET_HIERARCHY_IS_SORTING } from 'constants/actionTypes/hierarchy';

export default isSorting => dispatch =>
    dispatch({
        type: SET_HIERARCHY_IS_SORTING,
        isSorting,
    });
