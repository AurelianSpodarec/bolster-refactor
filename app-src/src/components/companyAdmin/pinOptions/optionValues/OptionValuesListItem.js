import React from 'react';

import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';

import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';

const OptionValuesListItem = ({
    option,
    option: { id, name, isDisabled },
    setID,
    typeID,
    showEditModal,
    showDeleteModal,
    enableOptionValue,
    disableOptionValue,
}) => {
    const typeLink = PIN_OPTION_TYPES[typeID].link;

    return (
        <tr>
            <td>
                <CheckboxContainer
                    text={name}
                    name={`pin-option-checkbox-${id}`}
                    checked={!isDisabled}
                    handleChange={(_, value) => {
                        if (value) {
                            enableOptionValue(option);
                        } else {
                            disableOptionValue(option);
                        }
                    }}
                />
            </td>
            <td>
                <ButtonWrapper alignment="right">
                    <LinkButton
                        text="Documents"
                        href={`/company/pin-options/${typeLink}/${setID}/${id}/documents`}
                    />

                    <ActionMenu>
                        <ActionMenuActionButton text="Edit" onClick={() => showEditModal(option)} />
                        <ActionMenuActionButton
                            text="Delete"
                            onClick={() => showDeleteModal(option)}
                            isNegative
                        />
                    </ActionMenu>
                </ButtonWrapper>
            </td>
        </tr>
    );
};

export default OptionValuesListItem;
