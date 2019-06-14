import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SinglePinGenerateReportSuccessModal = ({
    handleViewReports,
    handleClose
}) => (
    <ModalOuterContainer extraClasses="response-modal">
        <div
            className=" size-lg-12"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center'
            }}
        >
            <i
                className="fa fa-check"
                style={{
                    borderRadius: '100%',
                    backgroundColor: 'green',
                    color: 'white',
                    fontSize: '3em',
                    padding: '0.5em'
                }}
            />
        </div>
        <BlockHeading title="Generating report" />
        <p>Your report is now generating and will be ready soon.</p>

        <BlockButtonWrapper>
            <button className="button" onClick={handleClose}>
                Close
            </button>
            <button className="button green" onClick={handleViewReports}>
                View reports
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default SinglePinGenerateReportSuccessModal;
