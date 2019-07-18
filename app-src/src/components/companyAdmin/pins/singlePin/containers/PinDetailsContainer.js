import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

import PinDetails from '../presentational/PinDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import { isObjEmpty } from 'helpers/generic';

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
            const isFirst = i === 0;
            return (
                <BlockContainer
                    key={history.id}
                    isEmpty={
                        // !users[history.createdByCompanyUserID] ||
                        !Object.values(services).length || !histories.length
                    }
                    isFetching={isFetching}
                    error={error}
                >
                    <BlockHeading
                        classes="underline-full"
                        title={`Pin ${pin.pinCode}`}
                    >
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
                        {isFirst && 
                        <Link
                            className="button green"
                            style={{ marginBottom: '0.25em' }}
                            to={`/company/pins/${pin.id}/add-history`}
                        >
                            <i className="fa fa-plus" /> Add New History
                        </Link>
                        }
                    </BlockHeading>
                    <PinDetails
                        pinHistory={histories.length - i}
                        history={history}
                        users={users}
                        services={services}
                        pin={pin}
                        drawingID={pin.drawingID}
                        historyCount={histories.length}
                    />
                </BlockContainer>
            );
        });
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, fetchSinglePin, pin, history } = this.props;

        // update selected pin after a history is deleted
        // if (
        //     (!prevProps.latestHistoryId && latestHistoryId) ||
        //     prevProps.latestHistoryId !== latestHistoryId
        // ) {
        //     selectPinHistory(latestHistoryId);
        // }

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
        }
    },
    { match }
) => {
    const pin = pins[match.params.id] || {};
    return {
        isFetching: fetchingPins || fetchingHistories || fetchingUsers,
        error,
        latestHistoryId: pin.latestHistoryID,
        histories: Object.values(histories),
        users: users || {},
        services: services || {},
        pin,
        postSuccess
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: id => dispatch(fetchSinglePin(id))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PinDetailsContainer)
);
