import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import UserSyncDataTable from '../presentational/UserSyncDataTable';
import fetchUserLatestSyncData from 'actions/superAdmin/syncs/async/fetchUserLatestSyncData';

const UserSyncDataTableContainer = ({
    id,
    fetchUserLatestSyncData,
    isFetching,
    error,
    syncData,
}) => {
    const headers = [
        'Sync ID',
        'Start Date',
        'Completion Date',
        'Errored?',
        'Device Type',
        'App Version',
        '# Pins Synced',
        '# Pin Histories Synced',
    ];

    const getLatestSyncs = useCallback(async () => {
        try {
            await fetchUserLatestSyncData({ id });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getLatestSyncs();
    }, []);

    return <UserSyncDataTable headers={headers} syncData={syncData} isFetching={isFetching} />;
};

const mapDispatchToProps = { fetchUserLatestSyncData };

const mapStateToProps = ({
    superAdmin: {
        syncsReducer: { isFetching, error, syncData },
    },
}) => ({
    isFetching,
    error,
    syncData,
});
export default connect(mapStateToProps, mapDispatchToProps)(UserSyncDataTableContainer);
