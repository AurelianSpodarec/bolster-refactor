import React from 'react';
import { Link } from 'react-router-dom';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const OptionSetsListItem = ({ set, set: { id, name }, setLink, showEditModal }) => (
    <tr>
        <td className="row-link">
            <Link to={`/company/pin-options/${setLink}/${id}`}>{name}</Link>
        </td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu>
                    <ActionMenuActionButton text="Edit" onClick={() => showEditModal(set)} />
                    <ActionMenuActionButton
                        text="Delete"
                        onClick={() => console.log('delete')}
                        isNegative
                    />
                </ActionMenu>
            </ButtonWrapper>
        </td>
    </tr>
);

export default OptionSetsListItem;
