import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsTable = () => (
    <div className="size-lg-12">
        <h2 className="heading heading-3 size-lg-12">Documents</h2>
        <Link to="" className="button">
            <i className="fal fa-plus" /> Attach document
        </Link>
    </div>
);

export default DocumentsTable;
