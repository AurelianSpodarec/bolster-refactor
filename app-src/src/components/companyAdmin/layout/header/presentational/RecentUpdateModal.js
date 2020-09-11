import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const RecentUpdateModal = ({ update: { title, fullDescription }, hideModal }) => (
    <ModalOuterContainer>
        <BlockHeading title={title} />
        <p className="generic-text intro-text size-lg-12">{fullDescription}</p>
        <BlockButtonWrapper>
            <button className="button" onClick={hideModal}>
                Close
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

const mapDispatchToProps = {
    hideModal,
};

export default connect(null, mapDispatchToProps)(RecentUpdateModal);
