import React from 'react';
import BlockContainer from '../../block/containers/BlockContainer';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from '../../button/containers/ButtonContainer';

const OAndMTsAndCsModal = ({ handleAccept }) => (
    <div className="modal-container size-lg-12">
        <div className="bg" />

        <div className={'modal-block'}>
            <BlockContainer>
                <BlockHeading title="Notice" />
                <p>
                    Bolster systems endeavours to keep all manufacturers information up to date. It
                    is the users responsibility however, to check that all information used is
                    correct before issuing to any third party.
                </p>
                <BlockButtonWrapper>
                    <ButtonContainer handleClick={handleAccept}>I agree</ButtonContainer>
                </BlockButtonWrapper>
            </BlockContainer>
        </div>
    </div>
);

export default OAndMTsAndCsModal;
