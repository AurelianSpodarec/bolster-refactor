import axios from 'axios';

import { POST_DRAWINGS_SORT } from 'constants/actionTypes/drawings';
import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import fetchAllDrawings from './fetchAllDrawings';

export default drawings => dispatch => {
    dispatch({ type: POST_DRAWINGS_SORT });

    axios
        .post(
            `${API_URL}/drawings/sort`,
            { items: drawings.map(({ id, sort }) => ({ id, sort })) },
            getHeaders(),
        )
        .catch(() => dispatch([fetchAllDrawings]()));
};
