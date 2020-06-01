import React, { Component } from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import ModalOuter from '../presentational/ModalOuter';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';

class ModalOuterContainer extends Component {
    render() {
        const { extraClasses, children, hideCloseButton } = this.props;

        return (
            <ModalOuter
                handleClose={this.handleClose}
                extraClasses={extraClasses}
                hideCloseButton={hideCloseButton}
            >
                {children}
            </ModalOuter>
        );
    }

    handleClose = () => {
        const {
            hideModal,
            updateHierarchyAddState,
            close = hideModal
        } = this.props;

        close();
        updateHierarchyAddState(false);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    updateHierarchyAddState: value => {
        dispatch(updateHierarchyAddState(value));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(ModalOuterContainer);
