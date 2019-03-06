import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const DocumentsTable = ({ location }) => (
    <div className="size-lg-12">
        <h1 className="heading heading-3 size-lg-12">DocumentsTable</h1>
        <Link className="button" to={`${location.pathname}/attatch-document`}>
            Attatch document
        </Link>
    </div>
);

export default withRouter(DocumentsTable);
