import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardDataByDrawingTable from '../presentational/DashboardDataByDrawingTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';

class DashboardDataByDrawingTableContainer extends Component {
    render() {
        const { drawings, isFetching, error } = this.props;

        return (
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(drawings)}
                noWhiteBackground
            >
                <DashboardDataByDrawingTable
                    headers={['Name', 'Pins updated', '']}
                    drawings={drawings}
                    isFetching={isFetching}
                    error={error}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        dashboardReducer: {
            drawingData,
            isFetchingDashPinsStats: isFetching,
            error
        }
    }
}) => ({
    drawings: drawingData,
    isFetching,
    error
});

export default connect(mapStateToProps)(DashboardDataByDrawingTableContainer);
