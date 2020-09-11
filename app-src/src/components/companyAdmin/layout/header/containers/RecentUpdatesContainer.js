import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import fetchRecentUpdates from 'actions/companyAdmin/recentUpdates/async/fetchRecentUpdates';
import postRecentUpdates from 'actions/companyAdmin/recentUpdates/async/postRecentUpdates';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { RECENT_UPDATE_MODAL } from 'constants/shared/modalTypes';
import { isEmpty } from 'helpers/generic';

import RecentUpdates from '../presentational/RecentUpdates';

const RecentUpdatesContainer = ({
    fetchRecentUpdates,
    showModal,
    isFetching,
    isPosting,
    error,
    updates,
    updatesLastViewedOn,
}) => {
    const node = useRef();
    const [listVisible, setListVisible] = useState(false);
    const [isUnread, setIsUnread] = useState(false);

    useEffect(() => {
        getRecentUpdates();
    }, []);

    return (
        <RecentUpdates
            node={node}
            listVisible={listVisible}
            toggleListVisibility={toggleListVisibility}
            isUnread={isUnread}
            isFetching={isFetching}
            error={error}
            updates={updates}
            handleOpenUpdate={handleOpenUpdate}
        />
    );

    function getRecentUpdates() {
        fetchRecentUpdates().then(() => checkIfAnyUnread());
    }

    function markAsRead() {
        if (!isPosting) {
            postRecentUpdates().then(() => setIsUnread(false));
        }
    }

    function toggleListVisibility() {
        if (!listVisible) {
            document.addEventListener('click', handleOutsideClick, false);

            if (isUnread) {
                markAsRead();
            }
        } else {
            document.removeEventListener('click', handleOutsideClick, false);
        }

        setListVisible(!listVisible);
    }

    function handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (node.current && node.current.contains(e.target)) {
            return;
        }

        setListVisible(false);
    }

    function handleOpenUpdate(update) {
        showModal(RECENT_UPDATE_MODAL, { update });
        setListVisible(false);
        document.removeEventListener('click', handleOutsideClick, false);
    }

    function checkIfAnyUnread() {
        const latestUpdate = updates[0];

        if (isEmpty(updates)) return;

        if (!updatesLastViewedOn && !isEmpty(updates)) {
            setIsUnread(true);
            return;
        }

        if (
            updatesLastViewedOn &&
            !isEmpty(updates) &&
            new Date(updatesLastViewedOn) < new Date(latestUpdate.publishDate)
        ) {
            setIsUnread(true);
            return;
        }

        setIsUnread(false);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        recentUpdatesReducer: { isFetching, isPosting, error, updates },
    },
    shared: {
        profileReducer: {
            profile: { updatesLastViewedOn },
        },
    },
}) => ({
    isFetching,
    isPosting,
    error,
    updates: Object.values(updates)
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .filter(({ publishDate }) => new Date(publishDate) <= new Date()),
    updatesLastViewedOn,
});

const mapDispatchToProps = {
    fetchRecentUpdates,
    postRecentUpdates,
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentUpdatesContainer);
