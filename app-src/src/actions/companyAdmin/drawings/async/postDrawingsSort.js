import axios from 'axios';

import { POST_DRAWINGS_SORT } from 'constants/actionTypes/floors';
import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import fetchAllDrawings from './fetchAllDrawings';

export default floors => dispatch => {
    dispatch({ type: POST_DRAWINGS_SORT });

    axios
        .post(
            `${API_URL}/floors/sort`,
            { items: floors.map(({ id, sort }) => ({ id, sort })) },
            getHeaders()
        )
        .catch(() => dispatch([fetchAllDrawings]()));
};
