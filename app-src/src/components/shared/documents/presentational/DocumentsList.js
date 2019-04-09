import React from 'react';
import { Link } from 'react-router-dom';
import DeleteDocumentContainer from '../containers/DeleteDocumentContainer';

const DocumentsList = ({ documents, location }) =>
    documents.map(document => (
        <tr key={document.id}>
            <td>
                <i className="table-icon far fa-file-alt" /> {document.name}
            </td>
            <td>
                <Link
                    to={`${location.pathname}/edit-document/${document.id}`}
                    className="button yellow icon-only"
                >
                    <i className="far fa-pencil fa-fw" />
                </Link>
                <DeleteDocumentContainer document={document} />
            </td>
        </tr>
    ));

export default DocumentsList;
