import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Error from '../../misc/presentational/Error';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';
import Loading from '../../misc/presentational/Loading';

const GenerateCostingEstimatingReportModal = ({
    hideModal,
    title = 'Generate Report',
    submitButtonText = 'OK',
    error = null,
    isPosting = false,
    postSuccess = false,
}) => (
    <ModalOuterContainer>
        <BlockHeading title={title} />
        {isPosting && (
            <>
                <p className="generic-text intro-text size-lg-12">
                    Your report is now being generated
                </p>
                <Loading />
            </>
        )}
        {error && <Error>{error}</Error>}
        {postSuccess && (
            <BlockButtonWrapper>
                <ButtonWrapper alignment="right">
                    <ActionButton text={submitButtonText} onClick={hideModal} size="small" />
                </ButtonWrapper>
            </BlockButtonWrapper>
        )}
    </ModalOuterContainer>
);

export default GenerateCostingEstimatingReportModal;
