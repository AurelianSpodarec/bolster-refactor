import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AllClientsListItem from '../presentational/AllClientsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_DELETE } from 'constants/shared/modalTypes';
import deleteClientFromDrawing from 'actions/companyAdmin/clients/async/deleteClientFromDrawing';

class AllClientsListItemContainer extends Component {
    render() {
        const { client, colCount, onMobile, headers } = this.props;

        return (
            <AllClientsListItem
                client={client}
                services={this._getServicesForClient()}
                colCount={colCount}
                goToEdit={this.goToEdit}
                removeAccess={this.removeAccess}
                onMobile={onMobile}
                headers={headers}
            />
        );
    }

    _getServicesForClient = () => {
        const { services, client } = this.props;

        const filteredServices = services.filter(({ id }) =>
            client.serviceIDs.includes(id)
        );

        return filteredServices.map(({ name }) => name);
    };

    goToEdit = () => {
        const { history, client } = this.props;

        history.push({
            pathname: `/company/drawings/${client.drawingID}/edit-client/${
                client.id
            }`,
            state: {
                isFromClientUserManagement: true
            }
        });
    };

    removeAccess = () => {
        const {
            showModal,
            hideModal,
            deleteClientFromDrawing,
            client
        } = this.props;

        const handleDelete = () => {
            deleteClientFromDrawing(client.id);
            hideModal();
        };

        showModal(CONFIRM_DELETE, {
            hideModal,
            client,
            message: `Are you sure you would like to remove ${
                client.userFirstName
            } ${client.userLastName}'s access?`,
            handleDelete
        });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        servicesReducer: { services }
    },
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    services: Object.values(services) || [],
    onMobile
});

const mapDispatchToProps = { showModal, hideModal, deleteClientFromDrawing };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AllClientsListItemContainer)
);
