import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

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
    return (
        dismissAlertModal && (
            <ModalOuterContainer hideCloseButton>
                <BlockHeading title={`Dismiss ${name}`} />
                Are you sure you would like to dismiss this alert?
                <br></br>
                <br></br>
                <Moment format={'DD/MM/YYYY'} date={date} />
                <br></br>
                {name}
                <BlockButtonWrapper>
                    <button
                        onClick={() => handleDismissAlert(id)}
                        type="submit"
                        className="button red"
                    >
                        Dismiss
                    </button>
                    <button className="button" onClick={() => setDismissAlertModal(false)}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </ModalOuterContainer>
        )
    );
};

export default DismissAlertModal;
