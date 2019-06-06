import React from 'react';
import { connect } from 'react-redux';
import ApprovedCompaniesListItem from '../presentational/ApprovedCompaniesListItem';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const ApprovedCompaniesListContainer = ({ companies, isFetching, error }) => {
    return companies.length ? (
        <div className="flex-row size-lg-12">
            {companies.map(company => (
                <BlockContainer
                    containerClass="flex-row-item size-lg-6 w-colour"
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
            noDataMessage="There are no companies currently on this list, please try again soon"
            error={error}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        approvedCompaniesReducer: { isFetching, error, approvedCompanies }
    }
}) => ({
    companies: Object.values(approvedCompanies),
    isFetching,
    error
});

export default connect(mapStateToProps)(ApprovedCompaniesListContainer);
