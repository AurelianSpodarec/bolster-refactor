import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { FILE_STORAGE_URL } from 'config';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const DocumentResponseAgreeanceModal = ({ user, response, hideModal }) => (
    <ModalOuterContainer>
        <div className="size-lg-12">
            <FieldOutput
                title="Response by"
                description={`${user.userFirstName} ${user.userLastName}`}
            />
            <FieldOutput
                title="Response created"
                description={<DateTimeContainer date={response.createdOn} />}
            />
            <FieldOutput
                title="Response synced"
                description={<DateTimeContainer date={response.syncedOn} />}
            />
            {response.signatureS3Key && (
                <FieldOutput title="Signature">
                    <img
                        className="signature"
                        alt="signature"
                        src={`data:image/png;base64,${response.signatureS3Key}`}
                    />
                </FieldOutput>
            )}
            {response.imageS3Key && (
                <FieldOutput title="Image">
                    <img
                        className="image"
                        alt="document response"
                        src={`${FILE_STORAGE_URL}/${response.imageS3Key}`}
                    />
                </FieldOutput>
            )}
        </div>
        <BlockButtonWrapper>
            <ButtonContainer handleClick={hideModal}>Close</ButtonContainer>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default DocumentResponseAgreeanceModal;
