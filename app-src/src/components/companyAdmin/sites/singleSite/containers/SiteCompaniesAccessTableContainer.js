import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompaniesAccessContainer from 'components/shared/companies/containers/CompaniesAccessContainer';

class SiteCompaniesAccessTableContainer extends Component {
    render() {
        return <CompaniesAccessContainer hierarchyType="site" />;
    }
}

export default SiteCompaniesAccessTableContainer;
