import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const SitePageHeader = ({ site }) => (
    <PageHeading title={`Site: ${site.name || ''}`}>
        <Link className="button" to="/site">
            <i className="fa fa-exchange" /> Change Ownership
        </Link>
    </PageHeading>
);

export default SitePageHeader;
