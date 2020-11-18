import React from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import fileDownload from 'js-file-download';

import RecentlyExtendedTable from '../presentational/RecentlyExtendedTable';
import fetchRecentlyExtended from 'actions/superAdmin/recentlyExtended/async/fetchRecentlyExtended';
import { componentDidMount } from 'helpers/generic';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

const RecentlyExtendedTableContainer = ({ isFetching, error, recentlyExtended }) => {
    const csvURL = `${ADMIN_API_URL}/drawings/extend/csv`;

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
            downloadCSV={downloadCSV}
        />
    );

    function downloadCSV() {
        axios.get(csvURL, getHeaders()).then(res => {
            fileDownload(res.data, 'RecentlyExtendedDrawings.csv');
        });
    }
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
