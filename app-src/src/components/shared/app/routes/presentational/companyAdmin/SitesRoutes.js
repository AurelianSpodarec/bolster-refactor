import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import AllSitesContainer from 'components/companyAdmin/sites/allSites/containers/AllSitesContainer';
import AddSite from 'components/companyAdmin/sites/addSite/presentational/AddSite';
import SingleSiteContainer from 'components/companyAdmin/sites/singleSite/containers/SingleSiteContainer';
import ChangeSiteOwnership from 'components/companyAdmin/sites/changeSiteOwnership/presentational/ChangeSiteOwnership';
import AttachSiteOperative from 'components/companyAdmin/sites/attachSiteOperative/presentational/AttachSiteOperative';
import InviteClientToSite from 'components/companyAdmin/sites/inviteClientToSite/presentational/InviteClientToSite';

import InviteCompany from 'components/companyAdmin/sites/inviteCompanyToSite/presentational/InviteCompanyToSite';
import AttachSiteDocumentContainer from 'components/companyAdmin/sites/attachSiteDocument/containers/AttachSiteDocumentContainer';
import SiteEditContainer from 'components/companyAdmin/sites/singleSite/containers/SiteEditContainer';

const SitesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllSitesContainer} />
        <Route exact path={`${baseUrl}/create`} component={AddSite} />
        <Route exact path={`${baseUrl}/:id`} component={SingleSiteContainer} />
        <Route
            exact
            path={`${baseUrl}/:id/edit`}
            component={SiteEditContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:siteID/change-ownership`}
            component={ChangeSiteOwnership}
        />
        <Route
            exact
            path={`${baseUrl}/:siteID/add-operative`}
            component={AttachSiteOperative}
        />
        <Route
            exact
            path={`${baseUrl}/:siteID/invite-client`}
            component={InviteClientToSite}
        />

        <Route
            exact
            path={`${baseUrl}/:siteID/attach-document`}
            component={AttachSiteDocumentContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:siteID/invite-company`}
            component={InviteCompany}
        />
    </SwitchWith404>
);

export default SitesRoutes;
