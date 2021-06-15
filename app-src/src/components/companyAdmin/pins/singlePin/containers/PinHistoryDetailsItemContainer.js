import React, { Component } from 'react';
import { connect } from 'react-redux';

import PinHistoryDetailsItem from '../presentational/PinHistoryDetailsItem';
import deletePinHistory from 'actions/companyAdmin/pins/async/deletePinHistory';
import { CONFIRM_DELETE, CONFIRM_EDIT_PIN } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import fetchSingleCompanyUser from 'actions/companyAdmin/userManagement/async/fetchSingleCompanyUser';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

class PinHistoryDetailsItemContainer extends Component {
    render() {
        const {
            history,
            services,
            drawingID,
            historyCount,
            isLoading,
            users,
            pin,
            templates,
            isFetching,
        } = this.props;

        const editedByUser = users[history.lastEditedByCompanyUserID];
        const editedByUserName = editedByUser
            ? `${editedByUser.userFirstName} ${editedByUser.userLastName}`
            : null;

        const createdByUser = users[history.createdByCompanyUserID];
        const addedByCompany = createdByUser
            ? `${createdByUser.formattedOperativeCode} (${createdByUser.companyName})`
            : null;

        const template = pin ? templates[pin.templateID] : null;
        const templateName = template ? template.name : null;

        return isLoading && isFetching ? (
            <Loading />
        ) : (
            <PinHistoryDetailsItem
                history={history}
                services={services}
                handleEditHistoryModal={this.handleEditHistoryModal}
                handleDeleteHistoryModal={this.handleDeleteHistoryModal}
                drawingID={drawingID}
                editedByUserName={editedByUserName}
                isDeleteHistory={historyCount > 1}
                pin={pin}
                addedByCompany={addedByCompany}
                templateName={templateName}
            />
        );
    }

    componentDidMount = () => {
        const { fetchCompanyUsers } = this.props;

        fetchCompanyUsers();
    };

    handleEditHistoryModal = () => {
        const { showModal, history } = this.props;
        const editURL = `/company/pins/${history.pinID}/edit-history/${history.id}`;
        showModal(CONFIRM_EDIT_PIN, { editURL });
    };

    handleDeleteHistoryModal = () => {
        const { hideModal, showModal, history, deletePinHistory, historyCount } = this.props;

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
            pinsReducer: { singlePin, isFetching: isFetchingPin },
            companyUsersReducer: { users, isFetching: isFetchingUsers },
            templatesReducer: { pinTemplates, isFetching: isFetchingTemplate },
        },
    },
    ownProps,
) => ({
    services,
    isFetching: isFetchingPin || isFetchingTemplate || isFetchingUsers,
    histories: Object.values(histories),
    users,
    pin: singlePin[ownProps.history.pinID],
    templates: pinTemplates,
});

const mapDispatchToProps = {
    showModal,
    hideModal,
    deletePinHistory,
    fetchSingleCompanyUser,
    fetchCompanyUsers,
};
export default connect(mapStateToProps, mapDispatchToProps)(PinHistoryDetailsItemContainer);
