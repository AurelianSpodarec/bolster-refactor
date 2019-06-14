import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import PinHistoryDetailsItem from '../presentational/PinHistoryDetailsItem';
import deletePinHistory from 'actions/companyAdmin/pins/async/deletePinHistory';
import { CONFIRM_DELETE, CONFIRM_EDIT_PIN } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class PinHistoryDetailsItemContainer extends Component {
    render() {
        const {
            history,
            historyCount,
            users,
            services,
            allHistories,
            drawingID
        } = this.props;
        const historyVersion =
            [...allHistories]
                .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
                .findIndex(item => item.id === history.id) + 1;

        const user = users[history.createdByCompanyUserID] || {};

        return (
            <PinHistoryDetailsItem
                history={history}
                historyCount={historyCount}
                version={historyVersion}
                createdBy={user}
                services={services}
                handleEditHistoryModal={this.handleEditHistoryModal}
                handleDeleteHistoryModal={this.handleDeleteHistoryModal}
                drawingID={drawingID}
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

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users },
        servicesReducer: { services },
        pinHistoriesReducer: { histories }
    }
}) => ({
    users,
    services,
    allHistories: Object.values(histories)
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
