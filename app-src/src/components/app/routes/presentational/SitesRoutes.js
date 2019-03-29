import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import AllSitesContainer from 'components/sites/allSites/containers/AllSitesContainer';
import AddSite from 'components/sites/addSite/presentational/AddSite';
import SingleSiteContainer from 'components/sites/singleSite/containers/SingleSiteContainer';
import ChangeSiteOwnership from 'components/sites/changeSiteOwnership/presentational/ChangeSiteOwnership';
import AttachSiteOperative from 'components/sites/attachSiteOperative/presentational/AttachSiteOperative';
import InviteClientToSite from 'components/sites/inviteClientToSite/presentational/InviteClientToSite';

import InviteCompany from 'components/sites/inviteCompanyToSite/presentational/InviteCompanyToSite';
import AttachSiteDocumentContainer from 'components/sites/attachSiteDocument/containers/AttachSiteDocumentContainer';

const SitesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllSitesContainer} />
        <Route exact path={`${baseUrl}/create`} component={AddSite} />
        <Route exact path={`${baseUrl}/:id`} component={SingleSiteContainer} />
        <Route
            exact
            path={`${baseUrl}/:siteId/change-ownership`}
            component={ChangeSiteOwnership}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/attach-operative`}
            component={AttachSiteOperative}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/invite-client`}
            component={InviteClientToSite}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/attach-document`}
            component={AttachSiteDocumentContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:siteId/invite-company`}
            component={InviteCompany}
        />
    </SwitchWith404>
);

export default SitesRoutes;
