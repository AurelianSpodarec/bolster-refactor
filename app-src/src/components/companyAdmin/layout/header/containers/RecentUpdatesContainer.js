import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import fetchRecentUpdates from 'actions/companyAdmin/recentUpdates/async/fetchRecentUpdates';
import postRecentUpdates from 'actions/companyAdmin/recentUpdates/async/postRecentUpdates';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { RECENT_UPDATE_MODAL } from 'constants/shared/modalTypes';
import { isEmpty } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';

import RecentUpdates from '../presentational/RecentUpdates';

const RecentUpdatesContainer = ({
    fetchRecentUpdates,
    postRecentUpdates,
    showModal,
    isFetching,
    isPosting,
    error,
    success,
    updates,
    updatesLastViewedOn,
}) => {
    const [listVisible, setListVisible] = useState(false);
    const [isUnread, setIsUnread] = useState(false);

    const node = useRef();
    const prevProps = usePrevious({ isFetching });

    useEffect(() => {
        fetchRecentUpdates();

        const interval = setInterval(() => fetchRecentUpdates(), 1000 * 120);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (prevProps.isFetching && !isFetching && success) {
            checkIfAnyUnread();
        }
    }, [prevProps.isFetching, isFetching]);

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

    function markAsRead() {
        postRecentUpdates({ updatesRead: true });
        setIsUnread(false);
    }

    function toggleListVisibility() {
        if (!listVisible) {
            document.addEventListener('click', handleOutsideClick, false);

            if (isUnread && !isPosting) {
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
        recentUpdatesReducer: { isFetching, isPosting, error, success, updates },
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
    success,
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
