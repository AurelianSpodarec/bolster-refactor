import React from 'react';
import HeadquartersCompanyListItemContainer from '../containers/HeadquartersCompanyListItemContainer';

const HeadquartersCompaniesList = ({ companies }) => {
    return companies.map(company => (
        <HeadquartersCompanyListItemContainer
            key={company.id}
            company={company}
        />
    ));
};

export default HeadquartersCompaniesList;
