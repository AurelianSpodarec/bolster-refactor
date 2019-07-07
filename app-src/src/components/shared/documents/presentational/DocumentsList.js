import React from 'react';
import { Link } from 'react-router-dom';
import { RAW_S3_STORAGE_URL } from 'config';

import DeleteDocumentContainer from '../containers/DeleteDocumentContainer';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

const DocumentsList = ({
    documents,
    location,
    clientControls,
    accessType,
    onMobile,
    headers,
    drawingExpired
}) =>
    documents.map(document => (
        <tr key={document.id}>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">
                        {headers[0]} / Link
                    </span>
                )}
                <a
                    href={`${RAW_S3_STORAGE_URL}/${document.fileS3Key}`}
                    rel="noopener norefferrer"
                    // eslint-disable-next-line react/jsx-no-target-blank
                    target="_blank"
                    className="text-link"
                >
                    <i className="table-icon far fa-file-alt" /> {document.name}
                </a>
            </td>
            <td>
                {!clientControls && (
                    <>
                        {onMobile && (
                            <span className="mobile-table-heading">
                                {headers[1]}
                            </span>
                        )}
                        <Link
                            to={`${location.pathname}/document-responses/${
                                document.id
                            }`}
                            className="button blue icon-only"
                        >
                            <i className="far fa-eye fa-fw" /> View responses
                        </Link>

                        {accessType >= ACCESS_TYPES_VALUES.WRITE &&
                            !drawingExpired && (
                                <>
                                    {onMobile && (
                                        <span className="mobile-table-heading">
                                            {headers[1]}
                                        </span>
                                    )}
                                    <Link
                                        to={`${
                                            location.pathname
                                        }/edit-document/${document.id}`}
                                        className="button yellow icon-only"
                                    >
                                        <i className="far fa-pencil fa-fw" />
                                    </Link>
                                    <DeleteDocumentContainer
                                        document={document}
                                    />
                                </>
                            )}
                    </>
                )}
                {/* {clientControls && <a href={`${fileURL}`} target="_blank" className="button blue"></a>} */}
            </td>
        </tr>
    ));

export default DocumentsList;
