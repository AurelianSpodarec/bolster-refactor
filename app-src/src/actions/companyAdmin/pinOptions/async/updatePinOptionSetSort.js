import axios from 'axios';

import { API_URL } from 'config';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { getHeaders } from 'helpers/api';

import fetchPinOptionSets from './fetchPinOptionSets';
import showModal from 'actions/shared/generic/modals/sync/showModal';

export default sets => async dispatch => {
    const items = sets.map(({ id, sort }) => ({ id, sort }));
    const postBody = { items };

    return axios.post(`${API_URL}/pinoptions/sets/sort`, postBody, getHeaders()).catch(() => {
        dispatch(fetchPinOptionSets());
        dispatch(showModal(ERROR_MODAL));
    });
};
