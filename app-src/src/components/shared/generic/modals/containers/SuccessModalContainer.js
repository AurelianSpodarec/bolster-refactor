import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import SuccessModal from '../presentational/SuccessModal';

const SuccessModalContainer = ({
    hideModal,
    title,
    message,
    link = '',
    linkMessage = ''
}) => (
    <SuccessModal
        hideModal={hideModal}
        title={title}
        message={message}
        link={link}
        linkMessage={linkMessage}
    />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal())
});

export default connect(
    null,
    mapDispatchToProps
)(SuccessModalContainer);
