import { ADMIN_SITE_MANAGEMENT_SELECT_HIERARCHY } from 'constants/actionTypes/siteManagement';

export default value => dispatch =>
    dispatch({
        type: ADMIN_SITE_MANAGEMENT_SELECT_HIERARCHY,
        value
    });
