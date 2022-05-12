import React from 'react';

import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { ReactComponent as TrashIcon } from '../../../../_content/images/icons/trash.svg';

const DeleteDocument = ({ handleShowModal, document }) => (
    <ActionButton
        onClick={() => handleShowModal(document)}
        svgIconComponent={TrashIcon}
        source="secondary"
        ambient="positive"
        extraClasses="icon-only typography-default-colour"
    />
);

export default DeleteDocument;
