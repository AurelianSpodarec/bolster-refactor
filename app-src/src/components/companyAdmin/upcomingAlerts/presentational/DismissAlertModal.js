import React from 'react';
import moment from 'moment';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const DismissAlertModal = ({
    id,
    name,
    date,
    setDismissAlertModal,
    dismissAlertModal,
    handleDismissAlert,
}) => {
    if (!dismissAlertModal) return null;
    return (
        <ModalOuterContainer hideCloseButton>
            <BlockHeading title={`Dismiss ${name}`} />
            <p>
                Are you sure you would like to dismiss{' '}
                <strong>{`${name} - ${moment(date).format('DD/MM/YYYY')} `}</strong>?
            </p>

            <BlockButtonWrapper>
                <button onClick={() => handleDismissAlert(id)} type="submit" className="button red">
                    Dismiss
                </button>
                <button className="button" onClick={() => setDismissAlertModal(false)}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default DismissAlertModal;
