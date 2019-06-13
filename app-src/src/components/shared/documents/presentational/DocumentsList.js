import React from 'react';
import { Link } from 'react-router-dom';
import { RAW_S3_STORAGE_URL } from 'config';

import DeleteDocumentContainer from '../containers/DeleteDocumentContainer';

const DocumentsList = ({ documents, location, clientControls }) =>
    documents.map(document => (
        <tr key={document.id}>
            <td>
                <a
                    href={`${RAW_S3_STORAGE_URL}/${document.fileS3Key}`}
                    rel="noopener norefferrer"
                    target="_blank"
                    className="text-link"
                >
                    <i className="table-icon far fa-file-alt" /> {document.name}
                </a>
            </td>
            <td>
                {!clientControls && (
                    <>
                        <Link
                            to={`${location.pathname}/document-responses/${
                                document.id
                            }`}
                            className="button blue icon-only"
                        >
                            <i className="far fa-eye fa-fw" /> View responses
                        </Link>
                        <Link
                            to={`${location.pathname}/edit-document/${
                                document.id
                            }`}
                            className="button yellow icon-only"
                        >
                            <i className="far fa-pencil fa-fw" />
                        </Link>
                        <DeleteDocumentContainer document={document} />
                    </>
                )}
                {/* {clientControls && <a href={`${fileURL}`} target="_blank" className="button blue"></a>} */}
            </td>
        </tr>
    ));

export default DocumentsList;
