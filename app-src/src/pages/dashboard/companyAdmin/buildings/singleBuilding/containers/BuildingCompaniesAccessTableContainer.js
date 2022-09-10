import React, { Component } from 'react';

import CompaniesAccessContainer from 'components_DEPRECATED/shared/companies/containers/CompaniesAccessContainer';

class BuildingCompaniesAccessTableContainer extends Component {
    render() {
        const { accessType } = this.props;
        return <CompaniesAccessContainer hierarchyType="building" accessType={accessType} />;
    }
}

export default BuildingCompaniesAccessTableContainer;
