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
            selectedTab,
            onMobile
        } = this.props;

        return (
            <BlockContainer
                containerClass="flex-row-item size-lg-6 size-md-12"
                isFetching={isFetching}
                error={error}
            >
                <DashboardDataBy
                    operatives={operatives}
                    drawings={drawings}
                    selectedTab={selectedTab}
                    onMobile={onMobile}
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
        tabsReducer: { selectedTab },
        mobileReducer: { onMobile }
    }
}) => ({
    onMobile,
    isFetching,
    error,
    selectedTab
});

export default connect(mapStateToProps)(DashboardDataByContainer);
