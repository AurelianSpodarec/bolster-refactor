import React from 'react';

import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

const SinglePinGenerateReportSuccessModal = ({ handleViewReports, handleClose }) => (
    <FlexModalOuter title="Generating Report" extraClasses="response-modal">
        <div className="flex-content-wrapper">
            <div className="flex-content">
                <p className="generic-text">
                    Your report is now generating and will be ready soon.
                </p>
            </div>
        </div>

        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
            <ActionButton text="Close" source="secondary" onClick={handleClose} />
            <ActionButton text="View Reports" onClick={handleViewReports} />
        </ButtonWrapper>
    </FlexModalOuter>
);

export default SinglePinGenerateReportSuccessModal;
