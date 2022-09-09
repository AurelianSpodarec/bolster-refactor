import React from 'react';
import HeadquartersCompanyListItemContainer from '../containers/HeadquartersCompanyListItemContainer';

const HeadquartersCompaniesList = ({ companies, headers }) => {
    return companies.map(company => (
        <HeadquartersCompanyListItemContainer
            key={company.id}
            company={company}
            headers={headers}
        />
    ));
};

export default HeadquartersCompaniesList;
