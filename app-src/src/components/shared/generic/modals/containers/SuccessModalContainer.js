import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import SuccessModal from '../presentational/SuccessModal';

const SuccessModalContainer = ({
    hideModal,
    message,
    link = '',
    linkMessage = ''
}) =>
    console.log(hideModal, message, linkMessage, link) || (
        <SuccessModal
            hideModal={hideModal}
            message={message}
            link={link}
            linkMessage={linkMessage}
        />
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
