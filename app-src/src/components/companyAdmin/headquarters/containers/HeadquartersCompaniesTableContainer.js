import React from 'react';
import { connect } from 'react-redux';

import HeadquartersCompaniesTable from '../presentational/HeadquartersCompaniesTable';

const HeadquartersCompaniesTableContainer = ({
    companies,
    headers = ['Name', '', 'Actions']
}) => <HeadquartersCompaniesTable companies={companies} headers={headers} />;

const mapStateToProps = ({
    companyAdmin: {
        headquartersReducer: { companies }
    }
}) => ({
    companies: Object.values(companies)
});

export default connect(mapStateToProps)(HeadquartersCompaniesTableContainer);
