import { SET_SITE_FILTERS } from 'constants/actionTypes/sites';

export default siteFilterType => dispatch =>
    dispatch({
        type: SET_SITE_FILTERS,
        siteFilterType,
    });
