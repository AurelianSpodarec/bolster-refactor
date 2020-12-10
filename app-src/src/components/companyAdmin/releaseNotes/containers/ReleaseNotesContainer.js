import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ReleaseNotes from '../presentational/ReleaseNotes';
import fetchRecentUpdates from 'actions/companyAdmin/recentUpdates/async/fetchRecentUpdates';
import { usePrevious } from 'helpers/hooks';

const ReleaseNotesContainer = ({ fetchRecentUpdates, updates, isFetching, error, success }) => {
    const [releaseNotes, setReleaseNotes] = useState([]);

    const prevProps = usePrevious({ isFetching, success });

    const getRecentUpdates = useCallback(async () => {
        await fetchRecentUpdates();
    }, []);

    useEffect(() => {
        getRecentUpdates();
    }, []);
    console.log(releaseNotes);
    useEffect(() => {
        if (!isFetching && success && !prevProps.success) {
            updates && setReleaseNotes(Object.values(updates));
        }
    }, [isFetching, prevProps.isFetching, success]);

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

const mapDispatchToProps = { fetchRecentUpdates };

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseNotesContainer);
