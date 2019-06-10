import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import { SORT_SITES } from 'constants/actionTypes/sites';
import fetchAllSites from './fetchAllSites';

export const sortSites = (id, hoverIndex) => ({
    type: SORT_SITES,
    id,
    hoverIndex
});

export default (id, hoverIndex) => dispatch => {
    dispatch(sortSites(id, hoverIndex));

    axios
        .get(`${API_URL}/sites `, getHeaders())
        .catch(() => dispatch(fetchAllSites()));
};
