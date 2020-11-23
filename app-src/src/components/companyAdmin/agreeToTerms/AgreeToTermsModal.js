import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AgreeToTerms from 'components/companyAdmin/agreeToTerms/AgreeToTerms';

const AgreeToTermsModal = () => {
    return (
        <div className="modal-container size-lg-12">
            <div className="bg" />

            <div className="modal-block" style={{ width: '80%', maxWidth: '80%' }}>
                <BlockContainer>
                    <AgreeToTerms />
                </BlockContainer>
            </div>
        </div>
    );
};

export default AgreeToTermsModal;
