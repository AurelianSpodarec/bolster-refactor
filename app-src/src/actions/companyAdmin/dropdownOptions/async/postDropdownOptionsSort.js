import axios from 'axios';

import { POST_PIN_OPTION_TYPES_SORT } from 'constants/actionTypes/dropdownOptions';
import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

import fetchAllDropdownOptions from './fetchAllDropdownOptions';

export default (type, options) => dispatch => {
    dispatch({ type: POST_PIN_OPTION_TYPES_SORT });

    axios
        .post(
            `${API_URL}/dropdownoptions/${type}/sort`,
            { items: options.map(({ id, sort }) => ({ id, sort })) },
            getHeaders(),
        )
        .catch(() => dispatch(fetchAllDropdownOptions(type)));
};
