import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';

import CompanyTimesheets from 'components/superAdmin/companyTimesheets/CompanyTimesheets';

const CompanyTimesheetsRoutes = ({ base = '/admin/company-timesheets' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={CompanyTimesheets} />
    </SwitchWith404>
);

export default CompanyTimesheetsRoutes;
