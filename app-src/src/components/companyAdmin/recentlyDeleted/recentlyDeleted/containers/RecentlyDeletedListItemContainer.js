import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RecentlyDeletedListItem from '../presentational/RecentlyDeletedListItem';

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

    componentDidUpdate = prevProps => {};

    handleRestore = (id, type) => {
        const { showModal, hideModal } = this.props;

        const message = 'Are you sure you would like to restore this data?';
        const handleSubmit = () => {
            console.log('done');
        };

        showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
    };
}

// const mapStateToProps = ({
//     companyAdmin: {
//         deletedDataReducer: {
//             drawings,
//             pinHistories,
//             isFetchingDrawings,
//             isFetchingPinHistories,
//             error
//         }
//     }
// }) => ({
//     drawings: Object.values(drawings),
//     pinHistories: Object.values(pinHistories),
//     isFetchingDrawings,
//     isFetchingPinHistories,
//     error
// });

const mapDispatchToProps = {
    hideModal,
    showModal
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(RecentlyDeletedListItemContainer)
);
