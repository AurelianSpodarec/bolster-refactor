import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import DeleteDocumentContainer from '../containers/DeleteDocumentContainer';

const DocumentsList = ({ documents, clientControls, location }) =>
    documents.map(document => (
        <tr key={document.id}>
            <td>
                <i className="table-icon far fa-file-alt" /> {document.name}
            </td>
            <td>
                <Link
                    to={`${location.pathname}/document-responses/${
                        document.id
                    }`}
                    className="button blue icon-only"
                >
                    <i className="far fa-pencil fa-fw" /> View responses
                </Link>
                <Link
                    to={`${location.pathname}/edit-document/${document.id}`}
                    className="button yellow icon-only"
                >
                    <i className="far fa-pencil fa-fw" />
                </Link>
                {/* {clientControls && <a href={`${fileURL}`} target="_blank" className="button blue"></a>} */}

                <DeleteDocumentContainer document={document} />
            </td>
        </tr>
    ));

export default DocumentsList;
