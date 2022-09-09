import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Companies from '../presentational/Companies';
import clientFetchCompaniesRequest from 'actions/client/companies/async/clientFetchCompaniesRequest';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import { componentDidMount } from 'helpers/generic';

const CompanySelectionContainer = () => {
    const dispatch = useDispatch();
    const { companies, isFetching, error } = useSelector(mapStateToProps);

    componentDidMount(() => {
        dispatch(clientFetchCompaniesRequest());
    });

    return (
        <>
            <PageHeading title="Companies" />
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={!companies.length}
                noDataMessage="There are no companies to choose from"
                noWhiteBackground
            >
                <Companies />
            </BlockContainer>
        </>
    );
};

const mapStateToProps = ({
    client: {
        companiesReducer: { companies, isFetching, error },
    },
}) => ({
    companies: Object.values(companies),
    isFetching,
    error,
});

export default CompanySelectionContainer;
