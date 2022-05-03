import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Error from '../../misc/presentational/Error';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const GenerateCostingEstimatingReportModal = ({
    hideModal,
    title = 'Generate Report',
    submitButtonText = 'OK',
    error = null,
}) => (
    <ModalOuterContainer>
        <BlockHeading title={title} />
        <p className="generic-text intro-text size-lg-12">Your report is now being generated</p>
        {error && <Error>{error}</Error>}
        <BlockButtonWrapper>
            <ButtonWrapper alignment="right">
                <ActionButton text={submitButtonText} onClick={hideModal} size="small" />
            </ButtonWrapper>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default GenerateCostingEstimatingReportModal;
