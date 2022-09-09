import React from 'react';

import useDeleteAlert from 'pages/dashboard/companyAdmin/upcomingAlerts/hierarchys/hooks/useDeleteAlert';

import ConfirmDeleteModal from 'components/shared/generic/modals/presentational/ConfirmDeleteModal';

const DeleteAlertModal = ({ id, hideModal }) => {
    const { handleSubmit } = useDeleteAlert(id);

    return (
        <ConfirmDeleteModal
            title="Delete alert?"
            message="Are you sure you would like to delete this alert?"
            hideModal={hideModal}
            handleDelete={handleSubmit}
        />
    );
};

export default DeleteAlertModal;
