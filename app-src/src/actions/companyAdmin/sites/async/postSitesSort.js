import axios from 'axios';

import { POST_SITES_SORT } from 'constants/actionTypes/sites';
import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import fetchAllSites from './fetchAllSites';

export default sites => dispatch => {
    dispatch({ type: POST_SITES_SORT });

    axios
        .post(
            `${API_URL}/sites/sort`,
            { items: sites.map(({ id, sort }) => ({ id, sort })) },
            getHeaders()
        )
        .catch(() => dispatch(fetchAllSites()));
};
