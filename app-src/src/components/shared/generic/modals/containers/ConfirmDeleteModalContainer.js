import React from 'react';
import { connect } from 'react-redux';

import ConfirmDeleteModal from '../presentational/ConfirmDeleteModal';

const ConfirmDeleteModalContainer = ({ deleteItem, id }) => {
    return (
        <ConfirmDeleteModal
            handleSubmit={handleSubmit}
            hideModal={e => {
                e.preventDefault();
                // hideModal();
            }}
        />
    );
    function handleSubmit(e) {
        e.preventDefault();
        deleteItem(id);
    }
};

export default ConfirmDeleteModalContainer;
