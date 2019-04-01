import React from 'react';
import CompaniesListItemContainer from '../containers/CompaniesListItemContainer';

const CompaniesList = ({ companies, colCount }) =>
    companies.map((company, i) => (
        <CompaniesListItemContainer
            key={company.id + i}
            colCount={colCount}
            company={company}
        />
    ));

export default CompaniesList;
