import React from 'react';
import { Link } from 'react-router-dom';

import ActionMenu from 'components_DEPRECATED/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components_DEPRECATED/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';

const OptionSetsListItem = ({
    set,
    set: { id, name },
    setLink,
    showEditModal,
    showDeleteModal,
    showDuplicateModal,
}) => (
    <tr>
        <td className="row-link w-checkbox">
            <Link to={`/admin/pin-options/${setLink}/${id}`}>{name}</Link>
        </td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu>
                    <ActionMenuActionButton text="Edit" onClick={() => showEditModal(set)} />
                    <ActionMenuActionButton
                        text="Duplicate"
                        onClick={() => showDuplicateModal(set)}
                    />
                    <ActionMenuActionButton
                        text="Delete"
                        onClick={() => showDeleteModal(set)}
                        isNegative
                    />
                </ActionMenu>
            </ButtonWrapper>
        </td>
    </tr>
);

export default OptionSetsListItem;
