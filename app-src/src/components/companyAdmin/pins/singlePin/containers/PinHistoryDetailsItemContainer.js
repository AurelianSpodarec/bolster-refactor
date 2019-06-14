import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import PinHistoryDetailsItem from '../presentational/PinHistoryDetailsItem';
import { CONFIRM_EDIT_PIN } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class PinHistoryDetailsItemContainer extends Component {
    render() {
        const {
            history,
            historyCount,
            users,
            services,
            drawingID,
            historyVersion
        } = this.props;

        const user = users[history.createdByCompanyUserID] || {};

        return (
            <PinHistoryDetailsItem
                history={history}
                historyCount={historyCount}
                version={historyVersion}
                createdBy={user}
                services={services}
                handleEditHistoryModal={this.handleEditHistoryModal}
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
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users },
        servicesReducer: { services }
    }
}) => ({
    users,
    services
});
const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinHistoryDetailsItemContainer);
