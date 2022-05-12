import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Error from '../../misc/presentational/Error';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';
import { ReactComponent as TrashIcon } from '../../../../../_content/images/icons/trash.svg';

const ConfirmDeleteModal = ({
    handleDelete,
    hideModal,
    handleCancel = hideModal,
    message = 'Are you sure you want to delete this?',
    title = 'Confirmation',
    isIncoming = false,
    deleteButtonText = 'Delete',
    icon,
    isPosting = false,
    error = null,
    svgIcon = null,
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={title} />
            <p className="generic-text intro-text size-lg-12">{message}</p>
            {error && <Error>{error}</Error>}
            <BlockButtonWrapper>
                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Cancel"
                        size="small"
                        source="secondary"
                        onClick={handleCancel}
                    />
                    <ActionButton text="Confirm" onClick={handleDelete} icon="check" />
                </ButtonWrapper>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default ConfirmDeleteModal;
