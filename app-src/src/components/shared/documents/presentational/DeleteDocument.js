import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import React from 'react';

const DeleteDocument = ({ handleShowModal, document }) => (
    <ActionButton
        onClick={() => handleShowModal(document)}
        icon="far fa-trash-alt fa-fw"
        source="secondary"
        ambient="positive"
        extraClasses="icon-only typography-default-colour"
    />
);

export default DeleteDocument;
