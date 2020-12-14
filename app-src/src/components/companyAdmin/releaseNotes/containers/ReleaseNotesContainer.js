import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ReleaseNotes from '../presentational/ReleaseNotes';
import fetchRecentUpdates from 'actions/companyAdmin/recentUpdates/async/fetchRecentUpdates';
import { usePrevious } from 'helpers/hooks';
import postRecentUpdates from 'actions/companyAdmin/recentUpdates/async/postRecentUpdates';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

const ReleaseNotesContainer = ({ fetchRecentUpdates, updates, isFetching, error, success }) => {
    const [releaseNotes, setReleaseNotes] = useState([]);

    const prevProps = usePrevious({ isFetching, success, error });

    useEffect(() => {
        fetchRecentUpdates();

        postRecentUpdates({ updatesRead: true });
    }, []);

    useEffect(() => {
        if (!isFetching && success && !prevProps.success) {
            updates && setReleaseNotes(Object.values(updates));
        }
        if (error && !prevProps.error) {
            return showModal(ERROR_MODAL, { message: error });
        }
    }, [isFetching, prevProps.isFetching, success, error, prevProps.error]);

    return <ReleaseNotes releaseNotes={releaseNotes} />;
};

const mapStateToProps = ({
    companyAdmin: {
        recentUpdatesReducer: { updates, isFetching, error, success },
    },
}) => ({
    updates,
    isFetching,
    error,
    success,
});

const mapDispatchToProps = { fetchRecentUpdates, postRecentUpdates };

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseNotesContainer);
