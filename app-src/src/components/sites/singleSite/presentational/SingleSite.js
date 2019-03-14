import React from 'react';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';
import SiteDocumentsTableContainer from '../containers/SiteDocumentsTableContainer';
import SiteBuildingsTableContainer from '../containers/SiteBuildingsTableContainer';
import SiteOperativesTableContainer from '../containers/SiteOperativesTableContainer';
import SiteClientsTableContainer from '../containers/SiteClientsTableContainer';
import SiteCompaniesAccessTableContainer from '../containers/SiteCompaniesAccessTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SitePageHeaderContainer from '../containers/SitePageHeaderContainer';

const SingleSite = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <div className="size-lg-12">
            <SitePageHeaderContainer />
        </div>
        <div className="size-lg-8">
            <SiteDetailsContainer />
        </div>
        <div className="size-lg-4">
            <SiteDocumentsTableContainer />
        </div>
        <div className="size-lg-12">
            <SiteBuildingsTableContainer />
        </div>
        <div className="size-lg-4">
            <SiteClientsTableContainer />
        </div>
        <div className="size-lg-4">
            <SiteOperativesTableContainer />
        </div>
        <div className="size-lg-4">
            <SiteCompaniesAccessTableContainer />
        </div>
    </>
);

export default SingleSite;
