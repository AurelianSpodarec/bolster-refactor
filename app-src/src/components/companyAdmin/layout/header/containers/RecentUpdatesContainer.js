import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import fetchRecentUpdates from 'actions/companyAdmin/recentUpdates/async/fetchRecentUpdates';

import RecentUpdates from '../presentational/RecentUpdates';

const RecentUpdatesContainer = ({ fetchRecentUpdates, isFetching, error, updates }) => {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentUpdatesContainer);
