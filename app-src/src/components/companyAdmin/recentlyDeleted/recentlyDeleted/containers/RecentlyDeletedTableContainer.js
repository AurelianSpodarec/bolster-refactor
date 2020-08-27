import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecentlyDeletedTable from '../presentational/RecentlyDeletedTable';

class RecentlyDeletedTableContainer extends Component {
    render() {
        const { isFetchingData, error, deleted } = this.props;

        return (
            <RecentlyDeletedTable
                headers={['Deleted item', 'Date Created', 'Date Deleted', 'Deleted By', 'Type', '']}
                recentlyDeleted={deleted}
                isFetching={isFetchingData}
                error={error}
            />
        );
    }
}

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

export default connect(mapStateToProps)(RecentlyDeletedTableContainer);
