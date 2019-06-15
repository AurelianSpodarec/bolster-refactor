import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardDataBy from '../presentational/DashboardDataBy';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class DashboardDataByContainer extends Component {
    render() {
        const {
            isFetching,
            error,
            operatives,
            drawings,
            selectedTab
        } = this.props;

        return (
            <BlockContainer
                containerClass="size-lg-6"
                isFetching={isFetching}
                error={error}
            >
                <DashboardDataBy
                    operatives={operatives}
                    drawings={drawings}
                    selectedTab={selectedTab}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        dashboardReducer: { isFetchingDashPinsStats: isFetching, error }
    },
    shared: {
        tabsReducer: { selectedTab }
    }
}) => ({
    isFetching,
    error,
    selectedTab
});

export default connect(mapStateToProps)(DashboardDataByContainer);
