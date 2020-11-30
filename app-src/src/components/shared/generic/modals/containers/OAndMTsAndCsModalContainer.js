import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OAndMTsAndCsModal from '../presentational/OAndMTsAndCsModal';
import { hideOAndMTsAndCsModal } from 'actions/shared/generic/modals/sync/hideOAndMTsAndCsModal';

// ! This works seperately to the regular modals.

const OAndMTsAndCsModalContainer = () => {
    const dispatch = useDispatch();
    const modalReducer = useSelector(({ shared: { modalReducer } }) => modalReducer);
    if (modalReducer.showOAndMTsAndCs) {
        return <OAndMTsAndCsModal handleAccept={handleAccept} />;
    }
    return null;

    function handleAccept() {
        // todo api call
        const message = modalReducer.oAndMTsAndCsMessage;
        dispatch(hideOAndMTsAndCsModal());
    }
};

export default OAndMTsAndCsModalContainer;
