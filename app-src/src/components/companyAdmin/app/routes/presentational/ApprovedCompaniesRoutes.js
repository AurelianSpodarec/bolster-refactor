import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ApprovedCompaniesPageContainer from 'components/companyAdmin/approvedCompanies/containers/ApprovedCompaniesPageContainer';

const ApprovedCompaniesRoutes = ({ base = '/company/approved-companies' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ApprovedCompaniesPageContainer} />
    </SwitchWith404>
);

export default ApprovedCompaniesRoutes;
