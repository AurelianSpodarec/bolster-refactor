import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

// import { isObjEmpty } from 'helpers/generic';

import PinDetails from '../presentational/PinDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class PinDetailsContainer extends Component {
    render() {
        const {
            histories,
            users,
            services,
            error,
            isFetching,
            pin
        } = this.props;

        const sortedHistories = [...histories].sort(
            (a, b) => moment(b.createdOn) - moment(a.createdOn)
        );

        return sortedHistories.map((history, i) => {
            return (
                <BlockContainer
                    key={history.id}
                    isEmpty={
                        !users[history.createdByCompanyUserID] ||
                        !Object.values(services).length ||
                        !histories.length
                    }
                    isFetching={isFetching}
                    error={error}
                >
                    <BlockHeading title={`Pin ${pin.pinCode || ''}`}>
                        <h4 className="small-text">
                            (History {histories.length - i} of{' '}
                            {histories.length}{' '}
                            {histories.length - i === histories.length
                                ? ' - Latest'
                                : histories.length - i === 1
                                ? ' - Earliest'
                                : ''}
                            )
                        </h4>
                    </BlockHeading>
                    <PinDetails
                        pinHistory={histories.length - i}
                        history={history}
                        users={users}
                        services={services}
                        pin={pin}
                        drawingID={pin.drawingID}
                    />
                </BlockContainer>
            );
        });
    }
}

const mapStateToProps = (
    {
        client: {
            pinsReducer: { isFetching: fetchingPins, pins, error: pinsError },
            pinHistoriesReducer: {
                histories,
                isFetching: fetchingHistories,
                error: pinHistoriesError
            },
            pinOperativesReducer: {
                users,
                isFetching: fetchingUsers,
                error: operativesError
            },
            servicesReducer: { services }
        }
    },
    { match }
) => {
    const pin = pins[match.params.id] || {};
    return {
        isFetching: fetchingPins || fetchingHistories || fetchingUsers,
        error: pinsError || pinHistoriesError || operativesError,
        latestHistoryId: pin.latestHistoryID,
        histories: Object.values(histories),
        users: users || {},
        services: services || {},
        pin
    };
};

export default withRouter(connect(mapStateToProps)(PinDetailsContainer));
