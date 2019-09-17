import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecentlyDeletedTable from '../presentational/RecentlyDeletedTable';

class RecentlyDeletedTableContainer extends Component {
    render() {
        const { isFetchingDrawings, isFetchingPinHistories, error } = this.props;

        return (
            <RecentlyDeletedTable
                headers={['Deleted item', 'Type', '']}
                recentlyDeleted={this._getDeletedItems() || []}
                isFetching={isFetchingDrawings || isFetchingPinHistories}
                error={error}
            />
        );
    }

    _getDeletedItems = () => {
        const { drawings, pinHistories } = this.props;

        const drawingsArr = drawings.map(({ id, name }) => ({ id, name, type: 1 }));
        const pinHistoriesArr = pinHistories.map(({ id, drawingName, pinCode }) => ({
            id,
            name: `${drawingName} - ${pinCode}`,
            type: 2
        }));

        const arr = drawingsArr.concat(pinHistoriesArr);

        return arr;
    };
}

const mapStateToProps = ({
    companyAdmin: {
        deletedDataReducer: {
            drawings,
            pinHistories,
            isFetchingDrawings,
            isFetchingPinHistories,
            error
        }
    }
}) => ({
    drawings: Object.values(drawings),
    pinHistories: Object.values(pinHistories),
    isFetchingDrawings,
    isFetchingPinHistories,
    error
});

export default connect(mapStateToProps)(RecentlyDeletedTableContainer);
