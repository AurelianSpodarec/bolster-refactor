import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompaniesAccessList from '../presentational/CompaniesAccessList';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT } from 'constants/shared/modalTypes';
import deleteCompanyPermissions from 'actions/companyAdmin/companiesPermissions/async/deleteCompanyPermissions';

class CompaniesAccessListContainer extends Component {
    render() {
        const {
            handleShowModal,
            parentId,
            accessType,
            smallList = false
        } = this.props;

        return (
            <CompaniesAccessList
                accessType={accessType}
                handleShowModal={handleShowModal}
                companies={Object.values(this.formatCompanies())}
                parentId={parentId}
                scrollLimit={
                    smallList &&
                    Object.values(this.formatCompanies()).length > 3
                        ? true
                        : false
                }
                handleRemovePermission={this.handleRemovePermissionModal}
            />
        );
    }

    handleRemovePermissionModal = (permissionID, serviceName) => {
        const { showModal, hideModal, deleteCompanyPermissions } = this.props;
        const handleSubmit = () => {
            // dispatch remove permission action
            deleteCompanyPermissions(permissionID);
            hideModal();
        };
        const message = `Are you sure you wish to remove this company's permissions for the ${serviceName} service?`;
        showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
    };

    formatCompanies = () => {
        const { companies, services } = this.props;
        const formatted = companies.reduce(
            (
                acc,
                {
                    companyName,
                    companyID,
                    accessType,
                    serviceID,
                    inherited,
                    state,
                    id: permissionID
                }
            ) => {
                const companyServices = acc[companyID]
                    ? acc[companyID].services
                    : [];
                acc[companyID] = {
                    ...(acc[companyID] || {
                        companyID,
                        companyName,
                        accessType,
                        allAccess: serviceID === null
                    }),
                    services: [
                        ...companyServices,
                        serviceID
                            ? {
                                  serviceID,
                                  serviceName: (services[serviceID] || {}).name,
                                  state,
                                  inherited,
                                  accessType,
                                  permissionID
                              }
                            : undefined
                    ]
                };
                return acc;
            },
            {}
        );
        return formatted;
    };
}

const mapStateToProps = ({
    companyAdmin: {
        servicesReducer: { services }
    }
}) => ({
    services
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    deleteCompanyPermissions: id => dispatch(deleteCompanyPermissions(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompaniesAccessListContainer);
