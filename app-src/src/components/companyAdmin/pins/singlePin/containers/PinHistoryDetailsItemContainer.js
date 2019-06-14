import React, { Component } from 'react';
import { connect } from 'react-redux';

import PinHistoryDetailsItem from '../presentational/PinHistoryDetailsItem';
import deletePinHistory from 'actions/companyAdmin/pins/async/deletePinHistory';
import { CONFIRM_DELETE, CONFIRM_EDIT_PIN } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class PinHistoryDetailsItemContainer extends Component {
    render() {
        const {
            history,
            users,
            services,
            drawingID,
            historyCount
        } = this.props;

        const user = users[history.createdByCompanyUserID] || {};

        return (
            <PinHistoryDetailsItem
                history={history}
                createdBy={user}
                services={services}
                handleEditHistoryModal={this.handleEditHistoryModal}
                handleDeleteHistoryModal={this.handleDeleteHistoryModal}
                drawingID={drawingID}
                showDeleteButton={historyCount > 1}
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
        const { hideModal, showModal, history, deletePinHistory } = this.props;

        const handleDelete = () => {
            deletePinHistory(history.id);
            hideModal();
        };
        const message = 'Are you sure you wish to delete this pin history?';
        showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users },
        servicesReducer: { services },
        pinHistoriesReducer: { histories }
    }
}) => ({
    users,
    services,
    histories: Object.values(histories)
});
const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: type => dispatch(hideModal(type)),
    deletePinHistory: historyID => dispatch(deletePinHistory(historyID))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinHistoryDetailsItemContainer);
