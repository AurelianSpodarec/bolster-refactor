import React from 'react';
import { Link } from 'react-router-dom';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

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
        <td className="row-link w-checkbox">
            <FlexWrapper justify="start" align="center">
                <CheckboxContainer
                    text=""
                    name={`pin-set-checkbox-${id}`}
                    checked={!isDisabled}
                    handleChange={(_, value) => {
                        if (value) {
                            enableOptionSet(set);
                        } else {
                            disableOptionSet(set);
                        }
                    }}
                />
                <Link to={`/company/pin-options/${setLink}/${id}`}>{name}</Link>
            </FlexWrapper>
        </td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu>
                    <ActionMenuActionButton text="Edit" onClick={() => showEditModal(set)} />
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
