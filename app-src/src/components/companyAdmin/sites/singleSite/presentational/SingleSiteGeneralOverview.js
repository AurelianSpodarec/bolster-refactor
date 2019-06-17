import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';
import SiteDocumentsTableContainer from '../containers/SiteDocumentsTableContainer';
import SiteBuildingsTableContainer from '../containers/SiteBuildingsTableContainer';
import SiteOperativeAddContainer from '../containers/SiteOperativeAddContainer';
import SiteClientInviteContainer from '../containers/SiteClientInviteContainer';
import SiteCompaniesAccessTableContainer from '../containers/SiteCompaniesAccessTableContainer';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

let SingleSiteGeneralOverview = ({ site }) => (
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
        {site.accessType >= ACCESS_TYPES_VALUES.WRITE && (
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
        )}
    </>
);

const mapStateToProps = (
    { companyAdmin: { sitesReducer } },
    { match: { params } }
) => ({ site: sitesReducer.sites[params['id']] || {} });

SingleSiteGeneralOverview = connect(mapStateToProps)(SingleSiteGeneralOverview);
SingleSiteGeneralOverview = withRouter(SingleSiteGeneralOverview);

export default SingleSiteGeneralOverview;
