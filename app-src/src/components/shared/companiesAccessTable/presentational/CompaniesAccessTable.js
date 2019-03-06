import React from 'react';
import { Link } from 'react-router-dom';

const CompaniesAccess = () => (
    <div className="size-lg-12">
        <h2 className="heading heading-3 size-lg-12">Companies with access</h2>
        <Link to="" className="button">
            <i className="fal fa-plus" /> Invite company
        </Link>
    </div>
);

export default CompaniesAccess;
