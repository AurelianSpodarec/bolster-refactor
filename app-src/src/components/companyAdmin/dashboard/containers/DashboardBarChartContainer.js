import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DashboardBarChart from '../presentational/DashboardBarChart';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

import { isEmpty } from 'helpers/generic';
import Block from 'components/shared/generic/block/presentational/Block';

class DashboardBarContainer extends Component {
    render() {
        const { isFetching, error, datasets, labels } = this.props;

        return (
            <>
                <Block containerClass="flex-row-item size-lg-6">
                    <BlockHeading title="Pins added by operatives" />
                    <BlockContainer
                        isFetching={isFetching}
                        error={error}
                        isEmpty={isEmpty(datasets) || isEmpty(labels)}
                        containerClass="size-lg-12"
                        noWhiteBackground
                    >
                        <DashboardBarChart data={this._data} />
                    </BlockContainer>
                </Block>
            </>
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
                    label: 'No action',
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
