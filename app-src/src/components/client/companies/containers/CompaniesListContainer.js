import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CompaniesList from '../presentational/CompaniesList';

const CompanySelectionContainer = () => {
    const companies = useSelector(mapStateToProps);
    const history = useHistory();

    return <CompaniesList companies={companies} selectCompany={selectCompany} />;

    function selectCompany(companyID) {
        localStorage.setItem('selectedCompany', companyID);
        history.push('/client/sites');
    }
};

const mapStateToProps = ({
    client: {
        companiesReducer: { companies },
    },
}) => ({
    companies: Object.values(companies),
});

export default CompanySelectionContainer;
