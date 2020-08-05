import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecentlyDeletedTable from '../presentational/RecentlyDeletedTable';

class RecentlyDeletedTableContainer extends Component {
    render() {
        const { isFetchingData, error } = this.props;

        return (
            <RecentlyDeletedTable
                headers={['Deleted item', 'Date Created', 'Date Deleted', 'Deleted By', 'Type', '']}
                recentlyDeleted={this._getDeletedItems()}
                isFetching={isFetchingData}
                error={error}
            />
        );
    }

    _getDeletedItems = () => {
        const {
            drawings,
            floors,
            buildings,
            sites,
            users,
            pinHistories,
            operativePermissions,
        } = this.props;

        const itemsArray = [
            ...drawings,
            ...floors,
            ...buildings,
            ...sites,
            ...users,
            ...pinHistories,
            ...operativePermissions,
        ];

        return itemsArray;
    };
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
    isFetchingData,
    error,
});

export default connect(mapStateToProps)(RecentlyDeletedTableContainer);
