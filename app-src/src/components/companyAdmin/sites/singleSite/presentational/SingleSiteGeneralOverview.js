import React from 'react';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';
import SiteDocumentsTableContainer from '../containers/SiteDocumentsTableContainer';
import SiteBuildingsTableContainer from '../containers/SiteBuildingsTableContainer';
import SiteOperativeAddContainer from '../containers/SiteOperativeAddContainer';
import SiteClientInviteContainer from '../containers/SiteClientInviteContainer';
import SiteCompaniesAccessTableContainer from '../containers/SiteCompaniesAccessTableContainer';

const SingleSiteGeneralOverview = () => (
    <>
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

export default SingleSiteGeneralOverview;
