import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const UnconfirmedEmailModal = ({
    hideModal,
    handleCancel = hideModal,
    message = 'Click submit button below to resend confirmation email.',
    icon = 'mail',
}) => (
    <ModalOuterContainer>
        <BlockHeading title={'Resend Confirmation Modal'} />
        <p className="generic-text intro-text size-lg-12">{message}</p>
        <BlockButtonWrapper>
            <button className="button red" onClick={() => console.log('email sent')}>
                <i className={`far fa-${icon} fa-fw`} />
                Submit
            </button>
            <button className="button" onClick={handleCancel}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default UnconfirmedEmailModal;
