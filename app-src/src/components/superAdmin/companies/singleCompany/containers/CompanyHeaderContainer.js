import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompanyHeader from '../presentational/CompanyHeader';

const CompanyHeaderContainer = ({ company }) => (
    <CompanyHeader company={company} />
);

export default withRouter(
    connect(({ companiesReducer }, { match }) => ({
        company: companiesReducer.companies[match.params.id] || {}
    }))(CompanyHeaderContainer)
);
