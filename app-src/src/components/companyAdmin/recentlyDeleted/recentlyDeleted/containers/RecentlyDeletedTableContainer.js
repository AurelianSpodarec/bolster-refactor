import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import RecentlyDeletedTable from '../presentational/RecentlyDeletedTable';
import { useDebounce } from 'helpers/hooks';
import fetchRecentlyDeleted from 'actions/companyAdmin/recentlyDeleted/async/fetchRecentlyDeleted';

const RecentlyDeletedTableContainer = ({
    isFetchingData,
    error,
    deleted,
    fetchRecentlyDeleted,
}) => {
    const pageSize = 50;
    const [page, setPage] = useState(1);
    const [type, setType] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useDebounce(() => {
        fetchRecentlyDeleted({ pageSize, pageNumber: page, searchTerm, type });
    }, [searchTerm]);
    // we don't want to stagger the page change or type
    useEffect(() => {
        fetchRecentlyDeleted({ pageSize, pageNumber: page, searchTerm, type });
    }, [page, type]);

    const typeOptions = [
        { label: 'Site', value: 'Site' },
        { label: 'Building', value: 'Building' },
        { label: 'Floor', value: 'Floor' },
        { label: 'Drawing', value: 'Drawing' },
        { label: 'Pin History', value: 'Pin History' },
        { label: 'User', value: 'User' },
        { label: 'Operative Permission', value: 'Operative Permission' },
    ];

    return (
        <RecentlyDeletedTable
            headers={['Deleted item', 'Date Created', 'Date Deleted', 'Deleted By', 'Type', '']}
            recentlyDeleted={deleted}
            isFetching={isFetchingData}
            error={error}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            type={type}
            setType={setType}
            typeOptions={typeOptions}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        deletedDataReducer: {
            drawings,
            floors,
            buildings,
            sites,
            users,
            pinHistories,
            operativePermissions,
            deleted,
            isFetchingData,
            error,
        },
    },
}) => ({
    drawings: Object.values(drawings || []),
    floors: Object.values(floors || []),
    buildings: Object.values(buildings || []),
    sites: Object.values(sites || []),
    users: Object.values(users || []),
    pinHistories: Object.values(pinHistories || []),
    operativePermissions: Object.values(operativePermissions || []),
    deleted,
    isFetchingData,
    error,
});
const mapDispatchToProps = {
    fetchRecentlyDeleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyDeletedTableContainer);
