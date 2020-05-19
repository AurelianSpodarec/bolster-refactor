import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import DropdownListContainer from 'components/companyAdmin/dropdownOptions/allDropdownOptions/containers/DropdownListContainer';
import SingleManufacturerContainer from 'components/companyAdmin/dropdownOptions/singleManufacturer/containers/SingleManufacturerContainer';
import OptionValueDocumentsContainer from 'components/companyAdmin/dropdownOptions/optionValueDocuments/containers/OptionValueDocumentsContainer';

const DropdownOptionsRoutes = ({ base = '/company/dropdown-options' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:type`} component={DropdownListContainer} />
        <Route exact path={`${base}/:type/:id`} component={SingleManufacturerContainer} />
        <Route
            exact
            path={`${base}/:type/:id/:optionValueID/documents`}
            component={OptionValueDocumentsContainer}
        />
    </SwitchWith404>
);

export default DropdownOptionsRoutes;
