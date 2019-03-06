import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import AllSites from 'components/sites/allSites/presentational/AllSites';
import Site from 'components/sites/singleSite/presentational/Site';
import Building from 'components/buildings/building/presentational/Building';
import ChangeSiteOwnership from 'components/sites/changeSiteOwnership/presentational/ChangeSiteOwnership';
import AttachSiteOperative from 'components/sites/attachSiteOperative/presentational/AttachSiteOperative';
import InviteClientToSite from 'components/sites/inviteClientToSite/presentational/InviteClientToSite';
import AttachSiteDocument from 'components/sites/attachSiteDocument/presentational/AttachSiteDocument';

const SitesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllSites} />
        <Route exact path={`${baseUrl}/:id`} component={Site} />
        <Route exact path={`${baseUrl}/:siteId`} component={Building} />
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
            component={AttachSiteDocument}
        />
    </SwitchWith404>
);

export default SitesRoutes;
