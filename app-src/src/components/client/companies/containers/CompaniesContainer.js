import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Companies from '../presentational/Companies';
import clientFetchCompaniesRequest from 'actions/client/companies/async/clientFetchCompaniesRequest';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

class CompanySelectionContainer extends Component {
    render = () => {
        const { companies, isFetching, error } = this.props;

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

    componentDidMount = () => {
        const { clientFetchCompaniesRequest } = this.props;

        clientFetchCompaniesRequest();
    };
}

const mapStateToProps = ({
    client: {
        companiesReducer: { companies, isFetching, error }
    }
}) => ({
    companies: Object.values(companies),
    isFetching,
    error
});

const mapDispatchToProps = dispatch => ({
    clientFetchCompaniesRequest: () => {
        dispatch(clientFetchCompaniesRequest());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CompanySelectionContainer)
);
