import React, { Component } from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/generic/modals/sync/hideModal';

import ModalOuter from '../presentational/ModalOuter';

class ModalOuterContainer extends Component {
    render() {
        const { hideModal, children } = this.props;

        return (
            <ModalOuter
                hideModal={() => {
                    hideModal();
                }}
            >
                {children}
            </ModalOuter>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalOuterContainer);
