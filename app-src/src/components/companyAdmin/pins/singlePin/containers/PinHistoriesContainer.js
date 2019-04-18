import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PinHistoriesList from '../presentational/PinHistoriesList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class PinHistoriesContainer extends Component {
    render() {
        const {
            pin,
            users,
            services,
            histories,
            selectedHistoryId,
            isFetching,
            error
        } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={
                    !pin.id ||
                    Object.values(users).length < 1 ||
                    Object.values(services).length < 1
                }
                contentClass="pin-single-history no-horizontal-padding"
            >
                <BlockHeading title={`Pin #${pin.id}`}>
                    <Link
                        className="button green"
                        to={`/company/pins/${pin.id}/add-history`}
                    >
                        <i className="fa fa-plus" /> Add history
                    </Link>
                </BlockHeading>

                <PinHistoriesList
                    histories={histories}
                    historyCount={histories.length}
                    selectedHistoryId={selectedHistoryId}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer,
            companyUsersReducer: { users },
            servicesReducer: { services },
            pinHistoriesReducer: { histories, selectedHistoryId }
        }
    },
    { match }
) => {
    const pin = pinsReducer.pins[match.params.id] || {};

    return {
        isFetching: pinsReducer.isFetching,
        error: pinsReducer.error,
        pin: pin,
        users: users || {},
        services: services || {},
        histories: Object.values(histories) || {},
        selectedHistoryId: selectedHistoryId
    };
};

export default withRouter(connect(mapStateToProps)(PinHistoriesContainer));
