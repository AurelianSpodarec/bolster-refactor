import React from 'react';
import { connect } from 'react-redux';
import ApprovedCompaniesListItem from '../presentational/ApprovedCompaniesListItem';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const ApprovedCompaniesListContainer = ({
    companies,
    isFetching,
    error,
    filters
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
            noData={!companies.length}
            noDataMessage="There are no companies currently on this list."
            error={error}
        />
    );

    function _getFilteredCompanies() {
        const name = filters.name.toLowerCase();
        return companies.filter(
            company =>
                company.name.toLowerCase().includes(name) ||
                company.code.includes(+name)
        );
    }
};

const mapStateToProps = ({
    companyAdmin: {
        approvedCompaniesReducer: {
            isFetching,
            error,
            approvedCompanies,
            filters
        }
    }
}) => ({
    companies: Object.values(approvedCompanies),
    isFetching,
    error,
    filters
});

export default connect(mapStateToProps)(ApprovedCompaniesListContainer);
