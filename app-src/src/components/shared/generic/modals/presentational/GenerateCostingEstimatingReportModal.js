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
    submitButtonText = 'Close',
    submitIcon = 'times',
    error = null,
    isPosting = false,
    postSuccess = false,
}) => (
    <ModalOuterContainer>
        <BlockHeading title={postSuccess ? 'Success' : 'Generating Report'} />
        {!isPosting && (
            <>
                <p className="generic-text intro-text size-lg-12">Please wait...</p>
                <Loading />
            </>
        )}
        {error && <Error>{error}</Error>}
        {postSuccess && (
            <>
                <p className="generic-text intro-text size-lg-12">
                    Your report is now being generated.
                </p>
                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text={submitButtonText}
                            icon={submitIcon}
                            onClick={hideModal}
                            size="small"
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </>
        )}
    </ModalOuterContainer>
);

export default GenerateCostingEstimatingReportModal;
