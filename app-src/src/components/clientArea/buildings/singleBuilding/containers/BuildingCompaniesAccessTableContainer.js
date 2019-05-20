import React, { Component } from 'react';

import CompaniesAccessContainer from 'components/shared/companies/containers/CompaniesAccessContainer';

class BuildingCompaniesAccessTableContainer extends Component {
    render() {
        return <CompaniesAccessContainer hierarchyType="building" />;
    }
}

export default BuildingCompaniesAccessTableContainer;
