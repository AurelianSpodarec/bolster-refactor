import React from 'react';
import { Link } from 'react-router-dom';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const OptionSetsListItem = ({
    set,
    set: { id, name, isDefault, isDisabled },
    setLink,
    showEditModal,
    showDeleteModal,
    setAsDefault,
}) => (
    <tr>
        <td className="row-link w-checkbox">
            <Link to={`/admin/pin-options/${setLink}/${id}`}>
                {name} {isDefault ? '(default)' : ''}
            </Link>
        </td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu>
                    <ActionMenuActionButton text="Edit" onClick={() => showEditModal(set)} />
                    {!isDefault && (
                        <ActionMenuActionButton
                            text="Set as default"
                            onClick={() => setAsDefault(set)}
                        />
                    )}
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
