import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import selectPinHistory from 'actions/companyAdmin/pins/sync/selectPinHistory';

import PinDetails from '../presentational/PinDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import { isObjEmpty } from 'helpers/generic';
import CompaniesListContainer from 'components/client/companies/containers/CompaniesListContainer';

class PinDetailsContainer extends Component {
    render() {
        const {
            // selectedHistory,
            histories,
            users,
            services,
            error,
            isFetching,
            pin
        } = this.props;

        // const historyVersion =

        //         .findIndex(item => item.id === selectedHistory.id) + 1;

        // const user = users[selectedHistory.createdByCompanyUserID];

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
                    <BlockHeading title={`Pin ${pin.pinCode}`}>
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
                        historyCount={histories.length}
                        historyVersion={histories.length - i}
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

    componentDidMount = () => {
        const { latestHistoryId, selectPinHistory } = this.props;
        if (latestHistoryId) selectPinHistory(latestHistoryId);
    };

    componentDidUpdate = prevProps => {
        const {
            latestHistoryId,
            selectPinHistory,
            postSuccess,
            fetchSinglePin,
            pin,
            history
        } = this.props;

        // update selected pin after a history is deleted
        // if (
        //     (!prevProps.latestHistoryId && latestHistoryId) ||
        //     prevProps.latestHistoryId !== latestHistoryId
        // ) {
        //     selectPinHistory(latestHistoryId);
        // }

        if (prevProps.latestHistoryId !== latestHistoryId) {
            selectPinHistory(latestHistoryId);
        }

        // redirect to drawing if deleting pin history has deleted pin
        const { drawingID } = prevProps.pin;
        if (postSuccess && !prevProps.postSuccess) {
            fetchSinglePin(pin.id).then(({ error }) => {
                if (error) history.push(`/company/drawings/${drawingID}`);
            });
        }
        if (!isObjEmpty(prevProps.pin) && isObjEmpty(pin)) {
            history.push(`/company/drawings/${drawingID}`);
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { isFetching: fetchingPins, postSuccess, pins },
            pinHistoriesReducer: {
                histories,
                isFetching: fetchingHistories,
                error
            },
            companyUsersReducer: { users, isFetching: fetchingUsers },
            servicesReducer: { services }
        },
        shared: {
            selectedHistoryReducer: { selectedHistoryId }
        }
    },
    { match }
) => {
    const pin = pins[match.params.id] || {};
    return {
        isFetching: fetchingPins || fetchingHistories || fetchingUsers,
        error,
        latestHistoryId: pin.latestHistoryID,
        selectedHistory: histories[selectedHistoryId] || {},
        histories: Object.values(histories),
        users: users || {},
        services: services || {},
        pin,
        postSuccess
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: id => dispatch(fetchSinglePin(id)),
    selectPinHistory: historyID => dispatch(selectPinHistory(historyID))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PinDetailsContainer)
);
