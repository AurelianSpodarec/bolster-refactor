import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AgreeToTerms from 'components/companyAdmin/agreeToTerms/AgreeToTerms';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AgreeToTermsModal = ({ handleClick }) => {
    return (
        <div className="modal-container size-lg-12">
            <div className="bg" />

            <div className="modal-block" style={{ width: '80%', maxWidth: '80%' }}>
                <BlockContainer>
                    <BlockButtonWrapper>
                        <ButtonContainer handleClick={handleClick}>
                            <i className="fa fa-times" />
                            Close
                        </ButtonContainer>
                    </BlockButtonWrapper>
                    <AgreeToTerms handleClick={handleClick} />
                </BlockContainer>
            </div>
        </div>
    );
};

export default AgreeToTermsModal;
