import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllSitesContainer from 'components/companyAdmin/sites/allSites/containers/AllSitesContainer';
import AddSite from 'components/companyAdmin/sites/addSite/presentational/AddSite';
import SingleSiteContainer from 'components/companyAdmin/sites/singleSite/containers/SingleSiteContainer';
import ChangeSiteOwnership from 'components/companyAdmin/sites/changeSiteOwnership/presentational/ChangeSiteOwnership';
import AttachSiteOperative from 'components/companyAdmin/sites/attachSiteOperative/presentational/AttachSiteOperative';
import InviteClientToSiteContainer from 'components/companyAdmin/sites/inviteClientToSite/containers/InviteClientToSiteContainer';
import InviteCompanyToSiteContainer from 'components/companyAdmin/sites/inviteCompanyToSite/containers/InviteCompanyToSiteContainer';
import AttachSiteDocument from 'components/companyAdmin/sites/attachSiteDocument/presentational/AttachSiteDocument';
import SiteEditContainer from 'components/companyAdmin/sites/singleSite/containers/SiteEditContainer';
import EditSiteDocument from 'components/companyAdmin/sites/editSiteDocument/presentational/EditSiteDocument';
import EditCompanyPermissionsOnSiteFormContainer from 'components/companyAdmin/sites/editCompanyOnSite/containers/EditCompanyPermissionsOnSiteFormContainer';

const SitesRoutes = ({ base = '/company/sites' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllSitesContainer} />
        <Route exact path={`${base}/create`} component={AddSite} />
        <Route exact path={`${base}/:id`} component={SingleSiteContainer} />
        <Route exact path={`${base}/:id/edit`} component={SiteEditContainer} />
        <Route
            exact
            path={`${base}/:id/change-ownership`}
            component={ChangeSiteOwnership}
        />
        <Route
            exact
            path={`${base}/:id/add-operative`}
            component={AttachSiteOperative}
        />
        <Route
            exact
            path={`${base}/:id/invite-client`}
            component={InviteClientToSiteContainer}
        />

        <Route
            exact
            path={`${base}/:id/attach-document`}
            component={AttachSiteDocument}
        />

        <Route
            exact
            path={`${base}/:id/edit-document/:documentID`}
            component={EditSiteDocument}
        />

        <Route
            exact
            path={`${base}/:id/invite-company`}
            component={InviteCompanyToSiteContainer}
        />
        <Route
            exact
            path={`${base}/:id/edit-company/:companyID`}
            component={EditCompanyPermissionsOnSiteFormContainer}
        />
    </SwitchWith404>
);

export default SitesRoutes;
