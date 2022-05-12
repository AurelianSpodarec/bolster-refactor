import React from 'react';
import { RAW_S3_STORAGE_URL } from 'config';

import DeleteDocumentContainer from '../containers/DeleteDocumentContainer';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const DocumentsList = ({
    documents,
    location,
    clientControls,
    accessType,
    onMobile,
    headers,
    drawingExpired,
}) =>
    documents.map(document => (
        <tr key={document.id}>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[0]} / Link</span>}
                <a
                    href={`${RAW_S3_STORAGE_URL}/${document.fileS3Key}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-link link-without-background"
                >
                    <i className="table-icon far fa-file-alt" /> {document.name}
                </a>
            </td>
            <td>
                {!clientControls && (
                    <FlexWrapper>
                        {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                        <ButtonWrapper>
                            <LinkButton
                                href={`${location.pathname}/document-responses/${document.id}`}
                                icon="far fa-eye fa-fw"
                                source="secondary"
                                ambient="positive"
                                extraClasses="icon-only typography-default-colour"
                                text="View Responses"
                            />
                        </ButtonWrapper>

                        {accessType >= ACCESS_TYPES_VALUES.WRITE &&
                            document.isEditable &&
                            !drawingExpired && (
                                <>
                                    {onMobile && (
                                        <span className="mobile-table-heading">{headers[1]}</span>
                                    )}
                                    <ButtonWrapper>
                                        <LinkButton
                                            href={`${location.pathname}/edit-document/${document.id}`}
                                            icon="far fa-pencil fa-fw"
                                            source="secondary"
                                            ambient="positive"
                                            extraClasses="icon-only typography-default-colour"
                                        />
                                    </ButtonWrapper>

                                    <DeleteDocumentContainer document={document} />
                                </>
                            )}
                    </FlexWrapper>
                )}
            </td>
        </tr>
    ));

export default DocumentsList;
