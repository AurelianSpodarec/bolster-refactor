import React from 'react';
import { Route } from 'react-router-dom';
import SwitchWith404 from './SwitchWith404';
import AllCompaniesContainer from 'components/companies/allCompanies/containers/AllCompaniesContainer';

const CompaniesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllCompaniesContainer} />
    </SwitchWith404>
);

export default CompaniesRoutes;
