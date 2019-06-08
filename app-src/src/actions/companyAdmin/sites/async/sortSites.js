import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import { SORT_SITES } from 'constants/actionTypes/sites';
import fetchAllSites from './fetchAllSites';

export const sortSites = sites => ({
    type: SORT_SITES,
    sites
});

export default sites => dispatch => {
    dispatch(sortSites(sites));

    axios
        .get(`${API_URL}/sites `, getHeaders())
        .catch(() => dispatch(fetchAllSites()));
};
