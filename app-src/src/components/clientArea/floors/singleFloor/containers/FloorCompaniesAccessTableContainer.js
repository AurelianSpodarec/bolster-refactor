import React, { Component } from 'react';

import CompaniesAccessContainer from 'components/shared/companies/containers/CompaniesAccessContainer';

class FloorCompaniesAccessTableContainer extends Component {
    render() {
        return <CompaniesAccessContainer hierarchyType="floor" />;
    }
}

export default FloorCompaniesAccessTableContainer;
