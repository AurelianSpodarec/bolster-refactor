import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ApprovedCompaniesContainer from 'components/companyAdmin/approvedCompanies/containers/ApprovedCompaniesContainer';

const ApprovedCompaniesRoutes = ({ base = '/company/approved-companies' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ApprovedCompaniesContainer} />
    </SwitchWith404>
);

export default ApprovedCompaniesRoutes;
