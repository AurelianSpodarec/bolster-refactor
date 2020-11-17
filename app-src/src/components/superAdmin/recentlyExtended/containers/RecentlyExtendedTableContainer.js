import React from 'react';
import { connect, useDispatch } from 'react-redux';

import RecentlyExtendedTable from '../presentational/RecentlyExtendedTable';
import fetchRecentlyExtended from 'actions/superAdmin/recentlyExtended/async/fetchRecentlyExtended';
import { componentDidMount } from 'helpers/generic';

const RecentlyExtendedTableContainer = ({ isFetching, error, recentlyExtended }) => {
    const dispatch = useDispatch();
    componentDidMount(() => dispatch(fetchRecentlyExtended()));
    return (
        <RecentlyExtendedTable
            headers={[
                'Company Name',
                'Full Hierarchy',
                'Previous Expiry',
                'New Expiry Date',
                'Reason',
            ]}
            isFetching={isFetching}
            error={error}
            recentlyExtended={recentlyExtended}
        />
    );
};

const mapStateToProps = ({
    superAdmin: {
        recentlyExtendedReducer: { isFetching, error, recentlyExtended },
    },
}) => ({
    isFetching,
    error,
    recentlyExtended: Object.values(recentlyExtended),
});

export default connect(mapStateToProps)(RecentlyExtendedTableContainer);
