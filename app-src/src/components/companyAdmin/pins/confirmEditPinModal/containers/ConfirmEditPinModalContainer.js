import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import ConfirmEditPinModal from '../presentational/ConfirmEditPinModal';

class ConfirmEditPinModalContainer extends Component {
    render() {
        const { hideModal } = this.props;
        return (
            <ConfirmEditPinModal
                handleEditPin={this.handleEditPin}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
                message="Are you sure you wish to edit this pin history?"
            />
        );
    }

    handleEditPin = () => {
        const { history, editURL, hideModal } = this.props;
        hideModal();
        history.push(editURL);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal())
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(ConfirmEditPinModalContainer)
);
