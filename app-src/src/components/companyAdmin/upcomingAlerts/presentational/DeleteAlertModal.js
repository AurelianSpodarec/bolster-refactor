import React from 'react';

import useDeleteAlert from 'components/companyAdmin/upcomingAlerts/hierarchys/hooks/useDeleteAlert';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { ReactComponent as TrashIcon } from '../../../../_content/images/icons/trash.svg';

const DeleteAlertModal = ({ id, hideModal }) => {
    const { handleSubmit } = useDeleteAlert(id);

    return (
        <ModalOuterContainer hideCloseButton>
            <BlockHeading title="Delete alert?" />
            <p>Are you sure you would like to delete this alert?</p>

            <ButtonWrapper alignment="right">
                <ActionButton text="Cancel" onClick={hideModal} source="secondary" size="small" />
                <ActionButton text="Confirm" onClick={handleSubmit} icon="check" />
            </ButtonWrapper>
        </ModalOuterContainer>
    );
};

export default DeleteAlertModal;
