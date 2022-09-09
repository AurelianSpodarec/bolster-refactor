import React from 'react';
import CompaniesListItem from '../presentational/CompaniesListItem';

const CompaniesListItemContainer = ({
    company: { addressLine1, addressLine2, town, postcode, country, ...company },
    colCount,
}) => {
    const address =
        [addressLine1, addressLine2, town, postcode, country].filter(line => line).join(', ') ||
        '-';
    return <CompaniesListItem company={{ ...company, address }} colCount={colCount} />;
};

export default CompaniesListItemContainer;
