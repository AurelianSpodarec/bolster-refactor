import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AgreeToTerms from 'components/companyAdmin/agreeToTerms/AgreeToTerms';

const AgreeToTermsModal = ({ terms, eula, privacy }) => {
    return (
        <div className="modal-container size-lg-12">
            <div className="bg" />

            <div className="modal-block">
                <BlockContainer>
                    <AgreeToTerms terms={terms} eula={eula} privacy={privacy} />
                </BlockContainer>
            </div>
        </div>
    );
};

export default AgreeToTermsModal;
