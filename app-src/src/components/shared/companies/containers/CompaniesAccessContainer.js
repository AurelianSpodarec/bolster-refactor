import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompaniesAccessTable from 'components/shared/companies/presentational/CompaniesAccessTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { DELETE_COMPANY_PERMISSIONS } from 'constants/shared/modalTypes';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchCompaniesPermissions from 'actions/companyAdmin/companies/async/fetchCompanyPermissions';

class CompaniesAccessContainer extends Component {
    render() {
        const {
            companiesWithPermissions,
            hierarchyID,
            isFetching,
            error
        } = this.props;

        return (
            <BlockContainer error={error}>
                <CompaniesAccessTable
                    companies={companiesWithPermissions}
                    parentId={hierarchyID}
                    isFetching={isFetching}
                    handleShowModal={this.handleShowModal}
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

    handleShowModal = companyPermissionID => {
        const { showModal } = this.props;
        showModal(DELETE_COMPANY_PERMISSIONS, { companyPermissionID });
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
    },
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CompaniesAccessContainer)
);
