import React from 'react';
import { connect } from 'react-redux';
import ApprovedCompaniesListItem from '../presentational/ApprovedCompaniesListItem';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const ApprovedCompaniesListContainer = ({
    companies,
    isFetching,
    error,
    filters,
    sort
}) => {
    const filteredCompanies = _getFilteredCompanies();
    return filteredCompanies.length ? (
        <div className="flex-row size-lg-12">
            {filteredCompanies.map(company => (
                <BlockContainer
                    containerClass="flex-row-item size-lg-6"
                    isFetching={isFetching}
                    error={error}
                    noData={!companies.length}
                    key={company.id}
                >
                    <ApprovedCompaniesListItem company={company} />
                </BlockContainer>
            ))}
        </div>
    ) : (
        <BlockContainer
            isFetching={isFetching}
            isEmpty={!filteredCompanies.length}
            noDataMessage="There are no companies currently on this list."
            error={error}
        />
    );

    function _getFilteredCompanies() {
        const name = filters.name.toLowerCase();

        let filteredCompanies = companies.filter(
            company =>
                company.name.toLowerCase().includes(name) ||
                company.code.includes(+name)
        );

        filteredCompanies = filteredCompanies.sort((a, b) =>
            sort === 'A - Z'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );

        return filteredCompanies;
    }
};

const mapStateToProps = ({
    companyAdmin: {
        approvedCompaniesReducer: {
            isFetching,
            error,
            approvedCompanies,
            filters,
            sort
        }
    }
}) => ({
    companies: Object.values(approvedCompanies),
    isFetching,
    error,
    filters,
    sort
});

export default connect(mapStateToProps)(ApprovedCompaniesListContainer);
