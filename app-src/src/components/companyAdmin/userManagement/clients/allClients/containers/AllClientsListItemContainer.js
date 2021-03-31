import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AllClientsListItem from '../presentational/AllClientsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_DELETE, CONFIRM_SUBMIT } from 'constants/shared/modalTypes';
import disableClientUser from 'actions/companyAdmin/clients/async/disableClientUser';
import deleteClientUser from 'actions/companyAdmin/clients/async/deleteClientUser';
import { useIsMobile } from 'helpers/hooks';

const AllClientsListItemContainer = ({ client, colCount, headers }) => {
    const onMobile = useIsMobile();
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <AllClientsListItem
            client={client}
            services={[]}
            colCount={colCount}
            goToEdit={goToEdit}
            deleteClient={deleteClient}
            disableClient={disableClient}
            onMobile={onMobile}
            headers={headers}
        />
    );

    function goToEdit() {
        // todo
        history.push({
            pathname: `/company/users-management/clients/${client.id}/edit`,
            state: {
                isFromClientUserManagement: true,
            },
        });
    }

    function disableClient() {
        const handleDisable = () => {
            dispatch(disableClientUser(client.id, client.isDisabled));
            dispatch(hideModal());
        };
        const action = client.isDisabled ? 'Enable' : 'Disable';
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                title: action,
                message: 'Are you sure you want to ' + action.toLowerCase() + ' this client?',
                handleSubmit: handleDisable,
            }),
        );
    }

    function deleteClient() {
        const handleDelete = () => {
            dispatch(deleteClientUser(client.id));
            dispatch(hideModal());
        };

        dispatch(
            showModal(CONFIRM_DELETE, {
                hideModal: () => dispatch(hideModal()),
                client,
                message: `Are you sure you would like to delete ${client.firstName} ${client.lastName} as a client?`,
                handleDelete,
            }),
        );
    }
};

export default AllClientsListItemContainer;
