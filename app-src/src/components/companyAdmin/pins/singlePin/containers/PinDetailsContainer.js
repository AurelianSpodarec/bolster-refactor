import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import selectPinHistory from 'actions/companyAdmin/pins/sync/selectPinHistory';

import PinDetails from '../presentational/PinDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import deletePinHistory from 'actions/companyAdmin/pins/async/deletePinHistory';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_DELETE } from 'constants/shared/modalTypes';
import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';

class PinDetailsContainer extends Component {
    render() {
        const {
            selectedHistory,
            histories,
            users,
            services,
            error,
            isFetching,
            pin
        } = this.props;

        const historyVersion =
            [...histories]
                .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
                .findIndex(item => item.id === selectedHistory.id) + 1;

        const user = users[selectedHistory.createdByCompanyUserID];

        return (
            <BlockContainer
                isEmpty={
                    !user ||
                    Object.values(services).length < 1 ||
                    histories.length < 1
                }
                isFetching={isFetching}
                error={error}
            >
                <BlockHeading title="Pin Options" />
                <PinDetails
                    pinHistory={selectedHistory}
                    historyCount={histories.length}
                    historyVersion={historyVersion}
                    user={user}
                    services={services}
                    pin={pin}
                    handleDelete={this.handleDeleteModal}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { latestHistoryId, selectPinHistory } = this.props;
        if (latestHistoryId) {
            selectPinHistory(latestHistoryId);
        }
    };

    componentDidUpdate = prevProps => {
        const {
            latestHistoryId,
            selectPinHistory,
            postSuccess,
            fetchSinglePin,
            pin
        } = this.props;
        if (!prevProps.latestHistoryId && latestHistoryId) {
            selectPinHistory(latestHistoryId);
        }
        if (postSuccess && !prevProps.postSuccess) {
            fetchSinglePin(pin.id);
        }
        // TODO: check if pin still exists after deleted history and redirect if not
    };

    handleDeleteModal = () => {
        const {
            hideModal,
            showModal,
            selectedHistory,
            deletePinHistory
        } = this.props;

        const handleDelete = () => {
            deletePinHistory(selectedHistory.id);
            hideModal();
        };
        const message = 'Are you sure you wish to delete this pin history?';
        showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer,
            pinHistoriesReducer,
            companyUsersReducer,
            servicesReducer: { services }
        }
    },
    { match }
) => {
    const pin = pinsReducer.pins[match.params.id] || {};
    const { selectedHistoryId, histories } = pinHistoriesReducer;

    return {
        isFetching:
            pinsReducer.isFetching ||
            pinHistoriesReducer.isFetching ||
            companyUsersReducer.isFetching,
        error: pinHistoriesReducer.error,
        latestHistoryId: pin.latestHistoryID,
        selectedHistory: histories[selectedHistoryId] || {},
        histories: Object.values(histories),
        users: companyUsersReducer.users || {},
        services: services || {},
        pin,
        postSuccess: pinsReducer.postSuccess
    };
};

const mapDispatchToProps = dispatch => ({
    getSinglePin: id => dispatch(fetchSinglePin(id)),
    selectPinHistory: historyID => dispatch(selectPinHistory(historyID)),
    deletePinHistory: historyID => dispatch(deletePinHistory(historyID)),
    showModal: (type, props) => showModal(type, props),
    hideModal: () => hideModal()
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PinDetailsContainer)
);
