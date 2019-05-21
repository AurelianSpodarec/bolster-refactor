import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PinHistoriesList from '../presentational/PinHistoriesList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PinHistoriesContainer = ({
    pin: { id, pinCode },
    users,
    services,
    histories,
    selectedHistoryId,
    isFetching,
    error
}) => (
    <BlockContainer
        error={error}
        isFetching={isFetching}
        isEmpty={!id || !users.length || !services.length}
        contentClass="pin-single-history no-horizontal-padding"
    >
        <BlockHeading title={`Pin ${pinCode}`}>
            <Link
                className="button green"
                to={`/company/pins/${id}/add-history`}
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

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins, isFetching, error },
            companyUsersReducer: { users },
            servicesReducer: { services },
            pinHistoriesReducer: { histories, selectedHistoryId }
        }
    },
    { match }
) => {
    const pin = pins[match.params.id] || {};

    return {
        isFetching,
        error,
        pin,
        users: Object.values(users),
        services: Object.values(services),
        histories: Object.values(histories),
        selectedHistoryId
    };
};

export default withRouter(connect(mapStateToProps)(PinHistoriesContainer));
