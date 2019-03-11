import { SET_BREADCRUMBS } from 'constants/actionTypes/generic';

export default breadcrumbs => dispatch =>
    dispatch({
        type: SET_BREADCRUMBS,
        breadcrumbs
    });
