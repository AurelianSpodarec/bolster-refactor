import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const GenerateCostingEstimatingReportSuccessModal = ({
    hideModal,
    submitButtonText = 'Close',
    submitIcon = 'times',
}) => (
    <ModalOuterContainer>
        <BlockHeading title={'Success'} />
        <p className="generic-text intro-text size-lg-12">Your report is now being generated.</p>
        <BlockButtonWrapper>
            <ButtonWrapper alignment="right">
                <ActionButton
                    text={submitButtonText}
                    icon={submitIcon}
                    onClick={hideModal}
                    color="grey"
                    size="small"
                />
            </ButtonWrapper>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default GenerateCostingEstimatingReportSuccessModal;
