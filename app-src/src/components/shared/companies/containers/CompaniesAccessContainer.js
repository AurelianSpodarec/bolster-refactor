import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompaniesAccessTable from 'components/shared/companies/presentational/CompaniesAccessTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import fetchCompaniesPermissions from 'actions/companyAdmin/companies/async/fetchCompanyPermissions';

class CompaniesAccessContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <CompaniesAccessTable
                    companies={props.companiesWithPermissions}
                    parentId={props.hierarchyID}
                    isFetching={props.isFetching}
                    error={props.error}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const {
            fetchCompaniesPermissions,
            hierarchyType,
            hierarchyID
        } = this.props;

        fetchCompaniesPermissions(hierarchyType, hierarchyID);
    };
}

const mapStateToProps = (
    { companyAdmin: { companiesReducer } },
    { match }
) => ({
    hierarchyID: match.params.id,
    isFetching: companiesReducer.isFetching,
    error: companiesReducer.error,
    companiesWithPermissions: companiesReducer.companiesWithPermissions
});

const mapDispatchToProps = dispatch => ({
    fetchCompaniesPermissions: (hierarchyType, hierarchyID) => {
        dispatch(fetchCompaniesPermissions(hierarchyType, hierarchyID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CompaniesAccessContainer)
);
