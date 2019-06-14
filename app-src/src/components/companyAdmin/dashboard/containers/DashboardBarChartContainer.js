import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DashboardBarChart from '../presentational/DashboardBarChart';
import { isEmpty } from 'helpers/generic';

class DashboardBarContainer extends Component {
    render() {
        const { isFetching, error, datasets, labels } = this.props;

        return (
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(datasets) || isEmpty(labels)}
                containerClass="size-lg-6"
            >
                <DashboardBarChart data={this._data} />
            </BlockContainer>
        );
    }

    _data = () => {
        const { datasets, labels } = this.props;

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Action required',
                    backgroundColor: '#d61b1a',
                    stack: 'pins',
                    data: datasets.ActionRequired
                },
                {
                    label: 'Installed',
                    backgroundColor: '#2cab56',
                    stack: 'pins',
                    data: datasets.Installed
                },
                {
                    label: 'Inspected',
                    backgroundColor: '#3363dd',
                    stack: 'pins',
                    data: datasets.Inspected
                },
                {
                    label: 'No action required',
                    backgroundColor: '#efc209',
                    stack: 'pins',
                    data: datasets.NoAction
                },
                {
                    label: 'Other',
                    backgroundColor: '#800180',
                    stack: 'pins',
                    data: datasets.Other
                }
            ]
        };
    };
}

const mapStateToProps = ({
    companyAdmin: {
        dashboardReducer: {
            dashRecentPinsStats: { datasets, labels },
            isFetchingDashPinsStats,
            error
        }
    }
}) => ({
    datasets: datasets || {},
    labels: labels || [],
    isFetching: isFetchingDashPinsStats,
    error
});

export default connect(mapStateToProps)(DashboardBarContainer);
