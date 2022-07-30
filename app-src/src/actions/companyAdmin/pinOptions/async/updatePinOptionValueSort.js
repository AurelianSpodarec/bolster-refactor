import axios from 'axios';

import { API_URL } from 'config';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { getHeaders } from 'helpers/api';

import fetchPinOptions from './fetchPinOptions';
import showModal from 'actions/shared/generic/modals/sync/showModal';

export default options => async dispatch => {
    const items = options.map(({ id, sort }) => ({ id, sort }));
    const postBody = { items };

    return axios.post(`${API_URL}/pinoptions/options/sort`, postBody, getHeaders()).catch(() => {
        dispatch(fetchPinOptions());
        dispatch(showModal(ERROR_MODAL));
    });
};
