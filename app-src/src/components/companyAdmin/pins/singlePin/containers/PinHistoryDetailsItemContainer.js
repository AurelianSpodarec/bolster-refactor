import React, { Component } from 'react';
import { connect } from 'react-redux';

import PinHistoryDetailsItem from '../presentational/PinHistoryDetailsItem';
import deletePinHistory from 'actions/companyAdmin/pins/async/deletePinHistory';
import { CONFIRM_DELETE, CONFIRM_EDIT_PIN } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import Loading from 'components/shared/generic/misc/presentational/Loading';

class PinHistoryDetailsItemContainer extends Component {
    render() {
        const {
            history,
            services,
            drawingID,
            historyCount,
            isLoading
        } = this.props;

        return isLoading ? (
            <Loading />
        ) : (
            <PinHistoryDetailsItem
                history={history}
                services={services}
                handleEditHistoryModal={this.handleEditHistoryModal}
                handleDeleteHistoryModal={this.handleDeleteHistoryModal}
                drawingID={drawingID}
                isDeleteHistory={historyCount > 1}
            />
        );
    }

    handleEditHistoryModal = () => {
        const { showModal, history } = this.props;
        const editURL = `/company/pins/${history.pinID}/edit-history/${
            history.id
        }`;
        showModal(CONFIRM_EDIT_PIN, { editURL });
    };

    handleDeleteHistoryModal = () => {
        const {
            hideModal,
            showModal,
            history,
            deletePinHistory,
            historyCount
        } = this.props;

        const handleDelete = () => {
            deletePinHistory(history.id);
            hideModal();
        };
        const message = `Are you sure you wish to delete this pin ${
            historyCount > 1 ? 'history' : ''
        }?`;
        showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            servicesReducer: { services },
            pinHistoriesReducer: { histories },
            pinsReducer: { pins, isFetching: isFetchingPin }
        }
    },
    ownProps
) => ({
    services,
    isFetchingPin,
    histories: Object.values(histories),
    pin: pins[ownProps.history.pinID] || null
});

const mapDispatchToProps = { showModal, hideModal, deletePinHistory };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinHistoryDetailsItemContainer);
