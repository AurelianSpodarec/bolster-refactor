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
import { CONFIRM_DELETE, CONFIRM_EDIT_PIN } from 'constants/shared/modalTypes';
import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import { isObjEmpty } from 'helpers/generic';

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
                    !Object.values(services).length ||
                    !histories.length
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
                    handleEdit={this.handleEditModal}
                />
            </BlockContainer>
        );
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

    handleEditModal = () => {
        const { showModal, selectedHistory } = this.props;
        const editURL = `/company/pins/${selectedHistory.pinID}/edit-history/${
            selectedHistory.id
        }`;
        showModal(CONFIRM_EDIT_PIN, { editURL });
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
            pinsReducer: { isFetching: fetchingPins, postSuccess, pins },
            pinHistoriesReducer: {
                selectedHistoryId,
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
    selectPinHistory: historyID => dispatch(selectPinHistory(historyID)),
    deletePinHistory: historyID => dispatch(deletePinHistory(historyID)),
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PinDetailsContainer)
);
