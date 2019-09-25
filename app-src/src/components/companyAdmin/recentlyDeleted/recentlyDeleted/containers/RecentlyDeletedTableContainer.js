import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecentlyDeletedTable from '../presentational/RecentlyDeletedTable';

class RecentlyDeletedTableContainer extends Component {
    render() {
        const { isFetchingData, error } = this.props;

        return (
            <RecentlyDeletedTable
                headers={['Deleted item', 'Type', '']}
                recentlyDeleted={this._getDeletedItems()}
                isFetching={isFetchingData}
                error={error}
            />
        );
    }

    _getDeletedItems = () => {
        const { drawings, floors, buildings, sites, pinHistories } = this.props;

        const itemsArray = [...drawings, ...floors, ...buildings, ...sites, ...pinHistories];

        console.warn(itemsArray);

        // const drawingsArr = drawings.map(({ id, name }) => ({ id, name, type: 1 }));
        // const pinHistoriesArr = pinHistories.map(({ id, drawingName, pinCode }) => ({
        //     id,
        //     name: `${drawingName} - ${pinCode}`,
        //     type: 2
        // }));

        // const arr = drawingsArr.concat(pinHistoriesArr);

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
    pinHistories: Object.values(pinHistories) || [],
    isFetchingData,
    error
});

export default connect(mapStateToProps)(RecentlyDeletedTableContainer);
