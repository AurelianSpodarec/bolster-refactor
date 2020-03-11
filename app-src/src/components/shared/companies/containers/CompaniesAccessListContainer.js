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
            smallList = false,
            headers,
            onMobile,
        } = this.props;
        const formattedCompanies = this.formatCompanies();

        return (
            <CompaniesAccessList
                accessType={accessType}
                handleShowModal={handleShowModal}
                companies={formattedCompanies}
                parentId={parentId}
                scrollLimit={smallList && formattedCompanies.length > 3 ? true : false}
                handleRemovePermission={this.handleRemovePermissionModal}
                headers={headers}
                onMobile={onMobile}
            />
        );
    }

    handleRemovePermissionModal = (permissionID, serviceName) => {
        const { showModal, hideModal, deleteCompanyPermissions } = this.props;
        const handleSubmit = () => {
            deleteCompanyPermissions(permissionID);
            hideModal();
        };
        const message = `Are you sure you wish to remove this company's permissions for the ${serviceName} service?`;
        showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
    };

    formatCompanies = () => {
        const { companies, services } = this.props;
        const formatted = companies.reduce((acc, company) => {
            const {
                companyName,
                companyID,
                accessType,
                serviceID,
                inherited,
                state,
                id: permissionID,
            } = company;

            const companyServices = acc[companyID] ? acc[companyID].services : [];
            const thisCompany = {
                companyID,
                companyName,
                accessType,
                allAccess: serviceID === null,
            };

            const thisService = {
                serviceID,
                serviceName: (services[serviceID] || {}).name,
                state,
                inherited,
                accessType,
                permissionID,
            };
            // prevent duplicates
            const shouldAddService =
                !!serviceID &&
                !companyServices.some(
                    serv =>
                        serv.serviceID === serviceID && serv.accessType === thisService.accessType
                );

            const newServices = [...companyServices];
            if (shouldAddService) newServices.push(thisService);

            acc[companyID] = {
                ...(acc[companyID] || thisCompany),
                services: newServices,
            };
            return acc;
        }, {});
        return Object.values(formatted);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        servicesReducer: { services },
    },
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    onMobile,
    services,
});

const mapDispatchToProps = { showModal, hideModal, deleteCompanyPermissions };

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesAccessListContainer);
