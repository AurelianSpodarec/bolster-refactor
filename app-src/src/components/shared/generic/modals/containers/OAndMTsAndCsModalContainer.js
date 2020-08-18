import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import OAndMTsAndCsModal from '../presentational/OAndMTsAndCsModal';
import { hideOAndMTsAndCsModal } from 'actions/shared/generic/modals/sync/hideOAndMTsAndCsModal';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

// ! This works seperately to the regular modals.

const OAndMTsAndCsModalContainer = () => {
    const dispatch = useDispatch();
    const modalReducer = useSelector(({ shared: { modalReducer } }) => modalReducer);
    if (modalReducer.showOAndMTsAndCs) {
        return <OAndMTsAndCsModal handleAccept={handleAccept} />;
    }
    return null;

    async function handleAccept() {
        const logMessage = modalReducer.oAndMTsAndCsMessage;
        const postBody = { logMessage };
        try {
            await axios.post(`${API_URL}/users/company/0`, postBody, getHeaders());
        } catch {
            // ignore
        }

        dispatch(hideOAndMTsAndCsModal());
    }
};

export default OAndMTsAndCsModalContainer;
