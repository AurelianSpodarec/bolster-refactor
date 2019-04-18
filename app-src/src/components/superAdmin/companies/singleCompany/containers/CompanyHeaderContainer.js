import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CompanyHeader from '../presentational/CompanyHeader';

const CompanyHeaderContainer = ({ company }) => (
    <CompanyHeader company={company} />
);

const mapStateToProps = (
    {
        superAdmin: {
            companiesReducer: { companies }
        }
    },
    { match: { params } }
) => ({
    company: companies[params.id] || {},
    companyID: params.id
});

export default withRouter(connect(mapStateToProps)(CompanyHeaderContainer));
