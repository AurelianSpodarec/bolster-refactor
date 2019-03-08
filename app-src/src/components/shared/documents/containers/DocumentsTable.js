import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const DocumentsTable = ({ location }) => (
    <div className="size-lg-12">
        <h2 className="heading heading-3 size-lg-12">Documents</h2>
        <Link to={`${location.pathname}/attach-document`} className="button">
            <i className="fal fa-plus" /> Attach document
        </Link>
    </div>
);

export default withRouter(DocumentsTable);
