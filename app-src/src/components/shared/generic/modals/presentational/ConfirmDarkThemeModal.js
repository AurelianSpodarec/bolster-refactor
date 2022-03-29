import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ConfirmDarkThemeModal = ({ handleClose = () => {}, profileLink = '#' }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Dark Mode'} />
        <p className="generic-text intro-text size-lg-12">
            Welcome to Bolster Systems dark mode. If you would prefer to use the desktop in light
            mode you can update your settings through{' '}
            <a href={profileLink} className="text-link">
                My Profile
            </a>
        </p>
        <BlockButtonWrapper>
            <button className="button green" onClick={handleClose}>
                OK
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ConfirmDarkThemeModal;
