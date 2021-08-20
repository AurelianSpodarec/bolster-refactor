import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RecentlyDeletedListItem from '../presentational/RecentlyDeletedListItem';
// import restoreRecentlyDeleted from 'actions/superAdmin/recentlyDeleted/async/restoreRecentlyDeleted';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT } from 'constants/shared/modalTypes';

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

    handleRestore = restoreURI => {
        const { showModal, hideModal, restoreRecentlyDeleted } = this.props;

        const message = 'Are you sure you would like to restore this data?';

        const handleSubmit = () => restoreRecentlyDeleted(restoreURI);

        showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
    };
}

const mapDispatchToProps = {
    hideModal,
    showModal,
    // restoreRecentlyDeleted,
};

export default withRouter(connect(null, mapDispatchToProps)(RecentlyDeletedListItemContainer));
