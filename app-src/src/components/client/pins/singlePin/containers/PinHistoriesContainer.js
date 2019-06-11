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
        <BlockHeading title={`Pin ${pinCode}`} />

        <PinHistoriesList
            histories={histories}
            historyCount={histories.length}
            selectedHistoryId={selectedHistoryId}
        />
    </BlockContainer>
);

const mapStateToProps = (
    {
        client: {
            pinsReducer: { pins, isFetching, error },
            drawingOperativesReducer: { users },
            servicesReducer: { services },
            pinHistoriesReducer: { histories }
        },
        shared: {
            selectedHistoryReducer: { selectedHistoryId }
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
