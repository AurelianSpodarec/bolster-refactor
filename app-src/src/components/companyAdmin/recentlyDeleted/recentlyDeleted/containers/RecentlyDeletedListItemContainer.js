import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import restoreDrawing from 'actions/companyAdmin/drawings/async/restoreDrawing';
import restorePinHistory from 'actions/companyAdmin/pins/async/restorePinHistory';

import RecentlyDeletedListItem from '../presentational/RecentlyDeletedListItem';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT, ERROR_MODAL } from 'constants/shared/modalTypes';
import { DELETED_DATA_TYPE } from 'constants/companyAdmin/enums';

class RecentlyDeletedListItemContainer extends Component {
    render() {
        const { item, colCount, onMobile, headers } = this.props;

        return (
            <RecentlyDeletedListItem
                item={item}
                colCount={colCount}
                onMobile={onMobile}
                headers={headers}
                handleRestore={this.handleRestore}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { isPosting, postSuccess, postFailure, postError, hideModal } = this.props;

        if (prevProps.isPosting && !isPosting && postSuccess) {
            hideModal();
        }

        if (prevProps.isPosting && !isPosting && postFailure) {
            showModal(ERROR_MODAL, {
                title: 'Error',
                message: postError
            });
        }
    };

    handleRestore = (id, type) => {
        const { showModal, hideModal, restoreDrawing, restorePinHistory } = this.props;

        const message = 'Are you sure you would like to restore this data?';
        const handleSubmit = () => {
            if (type === DELETED_DATA_TYPE.DRAWING) {
                restoreDrawing(id);
            } else {
                restorePinHistory(id);
            }
        };

        showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        deletedDataReducer: { isPosting, postSuccess, postFailure, postError }
    }
}) => ({
    isPosting,
    postSuccess,
    postFailure,
    postError
});

const mapDispatchToProps = {
    hideModal,
    showModal,
    restoreDrawing,
    restorePinHistory
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RecentlyDeletedListItemContainer)
);
