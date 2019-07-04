import { ADMIN_SITE_MANAGEMENT_SELECT_OPTION } from 'constants/actionTypes/moveTool';

export default value => dispatch =>
    dispatch({
        type: ADMIN_SITE_MANAGEMENT_SELECT_OPTION,
        value
    });
