import { TOGGLE_SITE_EXPANDED } from 'constants/actionTypes/generic';

export default id => dispatch =>
    dispatch({
        type: TOGGLE_SITE_EXPANDED,
        id
    });
