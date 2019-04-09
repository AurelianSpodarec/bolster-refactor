import React from 'react';

const DeleteDocument = ({ handleShowModal, document }) => (
    <button
        onClick={() => handleShowModal(document)}
        className="button red icon-only"
    >
        <i className="far fa-trash-alt fa-fw" />
    </button>
);

export default DeleteDocument;
