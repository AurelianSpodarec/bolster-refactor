import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import SuccessModal from '../presentational/SuccessModal';

const SuccessModalContainer = ({ hideModal, message }) => (
    <SuccessModal hideModal={hideModal} message={message} />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SuccessModalContainer);
