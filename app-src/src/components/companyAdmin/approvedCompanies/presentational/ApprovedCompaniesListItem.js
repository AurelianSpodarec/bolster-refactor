import React from 'react';

const ApprovedCompaniesListItem = ({ company }) => {
    return (
        <div>
            <p>{company.name}</p>
            <p>{company.addressLine1}</p>
            <p>{company.addressLine2}</p>
            <p>{company.town}</p>
            <p>{company.postcode}</p>
            <p>{company.code}</p>
            <p>{company.s3code}</p>
        </div>
    );
};

export default ApprovedCompaniesListItem;
