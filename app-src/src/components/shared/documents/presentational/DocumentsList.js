import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsList = ({ documents, location }) =>
    documents.map(document => (
        <tr key={document.id}>
            <td>
                <i className="table-icon far fa-file-alt" /> {document.name}
            </td>
            <td>
                <Link
                    to={`${location.pathname}documents/${document.id}/edit`}
                    className="button icon-only"
                >
                    <i className="far fa-pencil fa-fw" />
                </Link>
                <Link to="#" className="button icon-only">
                    <i className="far fa-trash-alt fa-fw" />
                </Link>
            </td>
        </tr>
    ));

export default DocumentsList;
