import React from 'react';
import { FILE_STORAGE_URL, RAW_S3_STORAGE_URL } from 'config';

import FieldOutput from 'components_DEPRECATED/shared/generic/fieldOutput/presentational/FieldOutput';
import ButtonContainer from 'components_DEPRECATED/shared/generic/button/containers/ButtonContainer';
import DateTimeContainer from 'components_DEPRECATED/shared/dateTime/containers/DateTimeContainer';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

const DocumentResponseAgreeanceModal = ({ response, hideModal }) => (
    <FlexModalOuter title="Document response details">
        <div className="flex-content-wrapper">
            <div className="flex-content">
                <div className="size-lg-12">
                    <FieldOutput title="Response by" description={response.userName} />
                    <FieldOutput
                        title="Response created"
                        description={<DateTimeContainer date={response.createdOn} />}
                    />
                    <FieldOutput
                        title="Response synced"
                        description={<DateTimeContainer date={response.syncedOn} />}
                    />
                    {response.signatureS3Key && (
                        <>
                            {response.signatureS3Key.endsWith('.png') ||
                            response.signatureS3Key.endsWith('.jpg') ? (
                                <FieldOutput title="Signature">
                                    <img
                                        className="signature"
                                        alt="signature"
                                        src={`${FILE_STORAGE_URL}/${response.signatureS3Key}`}
                                    />
                                </FieldOutput>
                            ) : response.signatureS3Key.endsWith('.doc') ||
                              response.signatureS3Key.endsWith('.pdf') ? (
                                <FieldOutput title="Signature">
                                    <ButtonContainer
                                        to={`${RAW_S3_STORAGE_URL}/${response.signatureS3Key}`}
                                        isAnchor
                                        className="btn blue"
                                        openNewTab
                                    >
                                        <i className="table-icon far fa-eye" />
                                        View pdf
                                    </ButtonContainer>
                                </FieldOutput>
                            ) : (
                                <FieldOutput title="Signature">
                                    <img
                                        className="signature"
                                        alt="signature"
                                        src={`data:image/png;base64,${response.signatureS3Key}`}
                                    />
                                </FieldOutput>
                            )}
                        </>
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
            </div>
        </div>

        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
            <ActionButton text="Close" onClick={hideModal} />
        </ButtonWrapper>
    </FlexModalOuter>
);

export default DocumentResponseAgreeanceModal;
