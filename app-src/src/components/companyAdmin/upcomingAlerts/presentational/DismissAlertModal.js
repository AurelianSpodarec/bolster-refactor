import React from 'react';

import useDeleteHierarchyAlert from 'components/companyAdmin/upcomingAlerts/hierarchys/hooks/useDeleteHierarchysAlerts';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const DismissAlertModal = ({ id, hideModal }) => {
    const { handleSubmit } = useDeleteHierarchyAlert(id);

    return (
        <ModalOuterContainer hideCloseButton>
            <BlockHeading title="Delete alert?" />
            <p>Are you sure you would like to delete this alert?</p>

            <BlockButtonWrapper>
                <button onClick={handleSubmit} type="submit" className="button red">
                    Delete
                </button>
                <button className="button" onClick={hideModal}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default DismissAlertModal;
