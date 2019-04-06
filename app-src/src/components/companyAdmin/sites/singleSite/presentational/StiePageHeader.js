import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const SitePageHeader = ({ site }) => (
    <PageHeading title={`Site: ${site.name || ''}`}>
        <Link className="button" to={`/buildings/create/${site.id}`}>
            <i className="far fa-plus" /> Add building
        </Link>
        <Link className="button" to="/company/site">
            <i className="fa fa-exchange" /> Change Ownership
        </Link>
        <Link className="button yellow" to={`/company/sites/${site.id}/edit`}>
            <i className="far fa-pencil" /> Edit
        </Link>
    </PageHeading>
);

export default SitePageHeader;
