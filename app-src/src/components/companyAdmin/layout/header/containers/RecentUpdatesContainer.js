import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import fetchRecentUpdates from 'actions/companyAdmin/recentUpdates/async/fetchRecentUpdates';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { RECENT_UPDATE_MODAL } from 'constants/shared/modalTypes';

import RecentUpdates from '../presentational/RecentUpdates';

const RecentUpdatesContainer = ({ fetchRecentUpdates, showModal, isFetching, error, updates }) => {
    const node = useRef();
    const [listVisible, setListVisible] = useState(false);

    useEffect(() => {
        fetchRecentUpdates();
    }, []);

    return (
        <RecentUpdates
            node={node}
            listVisible={listVisible}
            toggleListVisibility={toggleListVisibility}
            isFetching={isFetching}
            error={error}
            updates={updates}
            handleOpenUpdate={handleOpenUpdate}
        />
    );

    function toggleListVisibility() {
        if (!listVisible) {
            document.addEventListener('click', handleOutsideClick, false);
        } else {
            document.removeEventListener('click', handleOutsideClick, false);
        }

        setListVisible(!listVisible);
    }

    function handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (node && node.current.contains(e.target)) {
            return;
        }

        setListVisible(false);
    }

    function handleOpenUpdate(update) {
        showModal(RECENT_UPDATE_MODAL, { update });
        setListVisible(false);
        document.removeEventListener('click', handleOutsideClick, false);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        recentUpdatesReducer: { isFetching, error, updates },
    },
}) => ({
    isFetching,
    error,
    updates: Object.values(updates),
});

const mapDispatchToProps = {
    fetchRecentUpdates,
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentUpdatesContainer);
