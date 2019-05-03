import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import DropdownListContainer from 'components/companyAdmin/dropdownOptions/containers/DropdownListContainer';

const DropdownOptionsRoutes = ({ base = '/company/dropdown-options' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:type`} component={DropdownListContainer} />
    </SwitchWith404>
);

export default DropdownOptionsRoutes;
