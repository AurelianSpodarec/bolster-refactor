import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompaniesAccessTable from 'components/shared/companies/presentational/CompaniesAccessTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { DELETE_COMPANY_PERMISSIONS } from 'constants/shared/modalTypes';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchCompaniesPermissions from 'actions/companyAdmin/companiesPermissions/async/fetchCompanyPermissions';

class CompaniesAccessContainer extends Component {
    render() {
        const {
            companiesWithPermissions,
            hierarchyID,
            isFetching,
            error,
            smallPod = false
        } = this.props;

        return (
            <BlockContainer error={error} containerClass="always-scrollbar">
                <CompaniesAccessTable
                    companies={companiesWithPermissions}
                    parentId={hierarchyID}
                    isFetching={isFetching}
                    handleShowModal={this.handleShowModal}
                    smallPod={smallPod}
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
    { companyAdmin: { companiesPermissionsReducer } },
    { match }
) => ({
    hierarchyID: match.params.id,
    isFetching: companiesPermissionsReducer.isFetching,
    error: companiesPermissionsReducer.error,
    companiesWithPermissions: Object.values(
        companiesPermissionsReducer.companiesPermissions
    )
});

const mapDispatchToProps = { fetchCompaniesPermissions, showModal };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CompaniesAccessContainer)
);
