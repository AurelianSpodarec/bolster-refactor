import axios from 'axios';

import { POST_MANUFACTURERS_SORT } from 'constants/actionTypes/dropdownOptions';
import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';

export default (type, options) => dispatch => {
    dispatch({ type: POST_MANUFACTURERS_SORT });

    axios
        .post(
            `${API_URL}/manufacturer/${type}/sort`,
            { items: options.map(({ id, sort }) => ({ manufacturerID: id, sort })) },
            getHeaders(),
        )
        .catch(() => dispatch(fetchManufacturersByPinOptionType(type)));
};
