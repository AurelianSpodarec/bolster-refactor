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
        servicesReducer: { services },
        pinHistoriesReducer: { histories }
    }
}) => ({
    users,
    services,
    allHistories: Object.values(histories)
});
const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinHistoryDetailsItemContainer);
