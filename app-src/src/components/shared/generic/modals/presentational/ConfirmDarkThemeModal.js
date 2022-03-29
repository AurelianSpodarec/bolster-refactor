import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { Link } from 'react-router-dom';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

const ConfirmDarkThemeModal = ({ handleClose = () => {}, profileLink = '#' }) => {
    const _handleConfirm = () => {
        handleClose();
        hideModal();
    };
    return (
        <ModalOuterContainer>
            <BlockHeading title={'Dark Mode'} />
            <p className="generic-text intro-text size-lg-12">
                Welcome to Bolster Systems dark mode. If you would prefer to use the desktop in
                light mode you can update your settings through{' '}
                <Link to={profileLink} href={profileLink} onClick={_handleConfirm}>
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
