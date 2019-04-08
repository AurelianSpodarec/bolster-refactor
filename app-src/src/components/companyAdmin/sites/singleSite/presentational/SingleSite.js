import React from 'react';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';
import SiteDocumentsTableContainer from '../containers/SiteDocumentsTableContainer';
import SiteBuildingsTableContainer from '../containers/SiteBuildingsTableContainer';
import SiteOperativeAddContainer from '../containers/SiteOperativeAddContainer';
import SiteClientInviteContainer from '../containers/SiteClientInviteContainer';
import SiteCompaniesAccessTableContainer from '../containers/SiteCompaniesAccessTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SitePageHeaderContainer from '../containers/SitePageHeaderContainer';
import BreadcrumbContainer from 'components/companyAdmin/pins/singlePin/containers/BreadcrumbContainer';

const SingleSite = () => (
    <>
        <BreadcrumbContainer />
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <div className="size-lg-12">
            <SitePageHeaderContainer />
        </div>
        <div className="flex-container size-lg-12">
            <div className="flex-item size-lg-8">
                <SiteDetailsContainer />
            </div>
            <div className="flex-item size-lg-4">
                <SiteDocumentsTableContainer />
            </div>
        </div>

        <div className="size-lg-12">
            <SiteBuildingsTableContainer />
        </div>
        <div className="flex-container size-lg-12">
            <div className="flex-item size-lg-4">
                <SiteClientInviteContainer />
            </div>
            <div className="flex-item size-lg-4">
                <SiteOperativeAddContainer />
            </div>
            <div className="flex-item size-lg-4">
                <SiteCompaniesAccessTableContainer />
            </div>
        </div>
    </>
);

export default SingleSite;
