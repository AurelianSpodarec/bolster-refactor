import React, { Component } from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/generic/modals/sync/hideModal';

import ModalOuter from '../presentational/ModalOuter';

class ModalOuterContainer extends Component {
    render() {
        const { extraClasses, hideModal, children } = this.props;

        return (
            <ModalOuter
                hideModal={() => {
                    hideModal();
                }}
                extraClasses={extraClasses}
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
