import { REORDER_SITE } from 'constants/actionTypes/sites';

export default payload => dispatch =>
    dispatch({
        type: REORDER_SITE,
        payload,
    });
