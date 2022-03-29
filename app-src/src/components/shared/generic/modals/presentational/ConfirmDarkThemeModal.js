import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { Link } from 'react-router-dom';
import LightThemePreview from '_content/images/previews/light-theme-preview.jpg';
import DarkThemePreview from '_content/images/previews/dark-theme-preview.jpg';

const ConfirmDarkThemeModal = ({
    handleConfirm = () => {},
    profileLink = '#',
    hideModal = () => {},
}) => {
    const _handleConfirm = () => {
        handleConfirm();
        hideModal();
    };
    return (
        <ModalOuterContainer>
            <BlockHeading title={'Dark Mode'} />
            <div className="dark-mode-previews">
                <img alt="Dark theme preview" src={DarkThemePreview} />
                <img alt="Light theme preview" src={LightThemePreview} />
            </div>
            <p className="generic-text intro-text size-lg-12">
                Welcome to Bolster Systems dark mode. If you would prefer to use the desktop in
                light mode you can update your settings through{' '}
                <Link
                    to={profileLink}
                    href={profileLink}
                    onClick={_handleConfirm}
                    className="text-link"
                >
                    My Profile
                </Link>
            </p>
            <BlockButtonWrapper>
                <button className="button green" onClick={_handleConfirm}>
                    OK
                </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default ConfirmDarkThemeModal;
