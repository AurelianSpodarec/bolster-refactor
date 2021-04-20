import { UPDATE_RECENTLY_EXTENDED_PAGE } from 'constants/actionTypes/recentlyExtended';

export default pageNumber => dispatch =>
    dispatch({
        type: UPDATE_RECENTLY_EXTENDED_PAGE,
        pageNumber,
    });
