import axios from 'axios';

import { POST_FLOORS_SORT } from 'constants/actionTypes/floors';
import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import fetchAllFloors from './fetchAllFloors';

export default floors => dispatch => {
    dispatch({ type: POST_FLOORS_SORT });

    axios
        .post(
            `${API_URL}/floors/sort`,
            { items: floors.map(({ id, sort }) => ({ id, sort })) },
            getHeaders()
        )
        .catch(() => dispatch(fetchAllFloors()));
};
