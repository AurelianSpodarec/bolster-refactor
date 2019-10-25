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
        const { drawings, floors, buildings, sites, users, pinHistories } = this.props;

        const itemsArray = [
            ...drawings,
            ...floors,
            ...buildings,
            ...sites,
            ...users,
            ...pinHistories
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
            isFetchingData,
            error
        }
    }
}) => ({
    drawings: Object.values(drawings) || [],
    floors: Object.values(floors) || [],
    buildings: Object.values(buildings) || [],
    sites: Object.values(sites) || [],
    users: Object.values(users) || [],
    pinHistories: Object.values(pinHistories) || [],
    isFetchingData,
    error
});

export default connect(mapStateToProps)(RecentlyDeletedTableContainer);
