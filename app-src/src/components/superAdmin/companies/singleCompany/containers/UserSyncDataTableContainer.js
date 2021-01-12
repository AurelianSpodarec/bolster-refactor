import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import UserSyncDataTable from '../presentational/UserSyncDataTable';
import fetchUserLatestSyncData from 'actions/superAdmin/syncs/async/fetchUserLatestSyncData';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

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
    const prevProps = usePrevious({ error });

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

    useEffect(() => {
        if (error && !prevProps.error) {
            return showModal(ERROR_MODAL, { message: error });
        }
    }, [error, prevProps.error]);

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
