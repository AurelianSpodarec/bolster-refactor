import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import AllSitesContainer from 'pages/dashboard/companyAdmin/sites/allSites/containers/AllSitesContainer';
import SingleSiteContainer from 'pages/dashboard/companyAdmin/sites/singleSite/containers/SingleSiteContainer';
import ChangeSiteOwnership from 'pages/dashboard/companyAdmin/sites/changeSiteOwnership/presentational/ChangeSiteOwnership';
import AttachSiteOperative from 'pages/dashboard/companyAdmin/sites/attachSiteOperative/presentational/AttachSiteOperative';
import InviteClientToSiteContainer from 'pages/dashboard/companyAdmin/sites/inviteClientToSite/containers/InviteClientToSiteContainer';
import InviteCompanyToSiteContainer from 'pages/dashboard/companyAdmin/sites/inviteCompanyToSite/containers/InviteCompanyToSiteContainer';
import AttachSiteDocument from 'pages/dashboard/companyAdmin/sites/attachSiteDocument/presentational/AttachSiteDocument';
import EditSiteDocument from 'pages/dashboard/companyAdmin/sites/editSiteDocument/presentational/EditSiteDocument';
import EditCompanyPermissionsOnSiteContainer from 'pages/dashboard/companyAdmin/sites/editCompanyOnSite/containers/EditCompanyPermissionsOnSiteContainer';
import AddCompanyPermissionsToSite from 'pages/dashboard/companyAdmin/sites/addCompanyPermissionsToSite/presentational/AddCompanyPermissionsToSite';
import DocumentResponsesContainer from 'components_DEPRECATED/shared/documents/containers/DocumentResponsesContainer';
import HierarchyAlerts from 'pages/dashboard/companyAdmin/upcomingAlerts/hierarchys/HierarchyAlerts';

const SitesRoutes = ({ base = '/company/sites' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllSitesContainer} />
        <Route exact path={`${base}/:id`} component={SingleSiteContainer} />
        <Route exact path={`${base}/:id/change-ownership`} component={ChangeSiteOwnership} />
        <Route exact path={`${base}/:id/add-operative`} component={AttachSiteOperative} />
        <Route exact path={`${base}/:id/invite-client`} component={InviteClientToSiteContainer} />

        <Route exact path={`${base}/:id/attach-document`} component={AttachSiteDocument} />

        <Route exact path={`${base}/:id/edit-document/:documentID`} component={EditSiteDocument} />

        <Route
            exact
            path={`${base}/:id/document-responses/:documentID`}
            component={DocumentResponsesContainer}
        />

        <Route exact path={`${base}/:id/invite-company`} component={InviteCompanyToSiteContainer} />
        <Route
            exact
            path={`${base}/:id/add-permissions/:companyID`}
            component={AddCompanyPermissionsToSite}
        />
        <Route
            exact
            path={`${base}/:id/edit-company/:companyID`}
            component={EditCompanyPermissionsOnSiteContainer}
        />
        <Route exact path={`${base}/:id/upcoming-alerts`} component={HierarchyAlerts} />
    </SwitchWith404>
);

export default SitesRoutes;
