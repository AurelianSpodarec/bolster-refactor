import React from 'react';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';
import SiteBuildingsTableContainer from '../containers/SiteBuildingsTableContainer';
import SitePageHeaderContainer from '../containers/SitePageHeaderContainer';

const SingleSite = () => (
    <>
        <div className="size-lg-12">
            <SitePageHeaderContainer />
        </div>
        <div className="size-lg-12">
            <SiteDetailsContainer />
        </div>
        <div className="size-lg-12">
            <SiteBuildingsTableContainer />
        </div>
    </>
);

export default SingleSite;
