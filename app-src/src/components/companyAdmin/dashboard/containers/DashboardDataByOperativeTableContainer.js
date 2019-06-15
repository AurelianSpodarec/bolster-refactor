import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardDataByOperativeTable from '../presentational/DashboardDataByOperativeTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';

class DashboardDataByOperativeTableContainer extends Component {
    render() {
        const { operatives, isFetching, error } = this.props;

        return (
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(operatives)}
                noWhiteBackground
            >
                <DashboardDataByOperativeTable
                    headers={[
                        'Name',
                        'Last login',
                        'Last sync',
                        'Pins updated',
                        'Actions'
                    ]}
                    operatives={operatives}
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
            operativeData,
            isFetchingDashPinsStats: isFetching,
            error
        }
    }
}) => ({
    operatives: operativeData,
    isFetching,
    error
});

export default connect(mapStateToProps)(DashboardDataByOperativeTableContainer);
