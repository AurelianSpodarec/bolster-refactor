import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllClientsListItem from '../presentational/AllClientsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_DELETE } from 'constants/shared/modalTypes';
import deleteClientFromDrawing from 'actions/companyAdmin/clients/async/deleteClientFromDrawing';

class AllClientsListItemContainer extends Component {
    render() {
        const { client, colCount } = this.props;

        return (
            <AllClientsListItem
                client={client}
                services={this._getServicesForClient()}
                colCount={colCount}
                removeAccess={this.removeAccess}
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
    }
}) => ({
    services: Object.values(services) || []
});

const mapDispatchToProps = { showModal, hideModal, deleteClientFromDrawing };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllClientsListItemContainer);
