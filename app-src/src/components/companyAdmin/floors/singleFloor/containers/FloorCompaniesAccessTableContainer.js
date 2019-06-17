import React, { Component } from 'react';

import CompaniesAccessContainer from 'components/shared/companies/containers/CompaniesAccessContainer';

class FloorCompaniesAccessTableContainer extends Component {
    render() {
        const { accessType } = this.props;
        return (
            <CompaniesAccessContainer
                hierarchyType="floor"
                accessType={accessType}
            />
        );
    }
}

export default FloorCompaniesAccessTableContainer;
