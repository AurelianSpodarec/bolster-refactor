import axios from 'axios';

import { POST_MANUFACTURER_OPTION_VALUES_SORT } from 'constants/actionTypes/dropdownOptions';
import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

import fetchOptionValuesByManufacturer from 'actions/companyAdmin/manufacturers/async/fetchOptionValuesByManufacturer';

export default (manufacturerID, options) => dispatch => {
    dispatch({ type: POST_MANUFACTURER_OPTION_VALUES_SORT });

    axios
        .post(
            `${API_URL}/manufacturer/${manufacturerID}/optionValues/sort`,
            { items: options.map(({ id, sort }) => ({ optionValueID: id, sort })) },
            getHeaders(),
        )
        .catch(() => dispatch(fetchOptionValuesByManufacturer(manufacturerID)));
};
