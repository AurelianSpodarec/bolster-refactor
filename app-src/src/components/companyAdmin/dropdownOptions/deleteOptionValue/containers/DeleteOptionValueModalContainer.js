import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteOptionValue from 'actions/companyAdmin/manufacturers/async/deleteOptionValue';
import DeleteOptionValueModal from '../presentational/DeleteOptionValueModal';

const DeleteOptionValueModalContainer = ({ optionValue, hideModal, deleteOptionValue }) => {
    const handleDelete = () => {
        deleteOptionValue(optionValue);
        hideModal();
    };

    return (
        <DeleteOptionValueModal
            handleDelete={handleDelete}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            deleteButtonText={'Confirm'}
            icon="check"
            optionValue={optionValue}
        />
    );
};

const mapDispatchToProps = {
    hideModal,
    deleteOptionValue,
};

export default connect(null, mapDispatchToProps)(DeleteOptionValueModalContainer);
