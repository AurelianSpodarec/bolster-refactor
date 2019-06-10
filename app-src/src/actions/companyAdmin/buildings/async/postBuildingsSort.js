import axios from 'axios';

import { POST_BUILDINGS_SORT } from 'constants/actionTypes/buildings';
import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import fetchAllBuildings from './fetchAllBuildings';

export default buildings => dispatch => {
    dispatch({ type: POST_BUILDINGS_SORT });

    axios
        .post(
            `${API_URL}/buildings/sort`,
            { items: buildings.map(({ id, sort }) => ({ id, sort })) },
            getHeaders()
        )
        .catch(() => dispatch(fetchAllBuildings()));
};
