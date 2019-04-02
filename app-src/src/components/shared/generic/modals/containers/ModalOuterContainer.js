import React from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import ModalOuter from '../presentational/ModalOuter';

const ModalOuterContainer = ({ extraClasses, hideModal, children }) => (
    <ModalOuter hideModal={hideModal} extraClasses={extraClasses}>
        {children}
    </ModalOuter>
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(ModalOuterContainer);
