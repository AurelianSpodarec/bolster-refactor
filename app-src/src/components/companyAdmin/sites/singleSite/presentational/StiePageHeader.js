import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const SitePageHeader = ({ site }) => (
    <div className="page-heading size-lg-12">
        <PageHeading title={`Site: ${site.name || ''}`} />
        <Breadcrumb
            breadcrumbs={[
                { text: 'Sites', link: '/company/sites' },
                { text: site.name }
            ]}
        >
            <Link
                className="button"
                to={`/company/buildings/create/${site.id}`}
            >
                <i className="far fa-plus" /> Add building
            </Link>
            <Link className="button" to="/company/site">
                <i className="fa fa-exchange" /> Change Ownership
            </Link>
        </Breadcrumb>
    </div>
);
export default SitePageHeader;
