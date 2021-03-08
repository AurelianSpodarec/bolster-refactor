import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AllClientsListItem from '../presentational/AllClientsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_DELETE } from 'constants/shared/modalTypes';
import deleteClientFromDrawing from 'actions/companyAdmin/clients/async/deleteClientFromDrawing';

const AllClientsListItemContainer = ({ client, colCount, headers }) => {
    const { services, onMobile } = useSelector(mapStateToProps);
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <AllClientsListItem
            client={client}
            services={_getServicesForClient()}
            colCount={colCount}
            goToEdit={goToEdit}
            removeAccess={removeAccess}
            onMobile={onMobile}
            headers={headers}
        />
    );

    function _getServicesForClient() {
        const filteredServices = services.filter(({ id }) => client.serviceIDs.includes(id));

        return filteredServices.map(({ name }) => name);
    }

    function goToEdit() {
        history.push({
            pathname: `/company/drawings/${client.drawingID}/edit-client/${client.id}`,
            state: {
                isFromClientUserManagement: true,
            },
        });
    }

    function removeAccess() {
        const handleDelete = () => {
            dispatch(deleteClientFromDrawing(client.id));
            dispatch(hideModal());
        };

        dispatch(
            showModal(CONFIRM_DELETE, {
                hideModal,
                client,
                message: `Are you sure you would like to remove ${client.userFirstName} ${client.userLastName}'s access?`,
                handleDelete,
            }),
        );
    }
};

const mapStateToProps = ({
    companyAdmin: {
        servicesReducer: { services },
    },
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    services: Object.values(services) || [],
    onMobile,
});

export default AllClientsListItemContainer;
