import React, { Component } from 'react';

import CompaniesAccessContainer from 'components/shared/companies/containers/CompaniesAccessContainer';

class BuildingCompaniesAccessTableContainer extends Component {
    render() {
        const { accessType } = this.props;
        return (
            <CompaniesAccessContainer
                hierarchyType="building"
                accessType={accessType}
            />
        );
    }
}

export default BuildingCompaniesAccessTableContainer;
