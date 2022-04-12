import React from 'react';
import { Link } from 'react-router-dom';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const OptionSetsListItem = ({
    set,
    set: { id, name, isDisabled },
    setLink,
    showEditModal,
    showDeleteModal,
    enableOptionSet,
    disableOptionSet,
}) => (
    <tr>
        <td className="row-link">
            <Link to={`/company/pin-options/${setLink}/${id}`}>{name}</Link>
        </td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu>
                    <ActionMenuActionButton text="Edit" onClick={() => showEditModal(set)} />
                    <ActionMenuActionButton
                        text={isDisabled ? 'Enable' : 'Disable'}
                        onClick={() => {
                            if (isDisabled) {
                                enableOptionSet(id);
                                return;
                            }

                            disableOptionSet(id);
                        }}
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
