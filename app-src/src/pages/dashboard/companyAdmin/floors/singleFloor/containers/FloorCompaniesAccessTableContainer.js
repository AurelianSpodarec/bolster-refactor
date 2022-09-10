import React, { Component } from 'react';

import CompaniesAccessContainer from 'components_DEPRECATED/shared/companies/containers/CompaniesAccessContainer';

class FloorCompaniesAccessTableContainer extends Component {
    render() {
        const { accessType } = this.props;
        return <CompaniesAccessContainer hierarchyType="floor" accessType={accessType} />;
    }
}

export default FloorCompaniesAccessTableContainer;
