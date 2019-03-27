import React from 'react';
import CompaniesListItemContainer from '../containers/CompaniesListItemContainer';

const CompaniesList = ({ companies, colCount }) =>
    companies.map(company => (
        <CompaniesListItemContainer
            key={company.id}
            colCount={colCount}
            company={company}
        />
    ));

export default CompaniesList;
