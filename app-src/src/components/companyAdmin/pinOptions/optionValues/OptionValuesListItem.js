import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';

import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';

const OptionValuesListItem = ({ option: { id, name, isDisabled }, setID, typeID }) => {
    const [isOptionDisabled, setIsOptionDisabled] = useState(isDisabled);
    const typeLink = PIN_OPTION_TYPES[typeID].link;

    return (
        <tr>
            <td>
                <CheckboxContainer
                    text={name}
                    name={`pin-option-checkbox-${id}`}
                    checked={!isOptionDisabled}
                    handleChange={(_, value) => setIsOptionDisabled(!value)}
                />
            </td>
            <td>
                <ButtonWrapper alignment="right">
                    <LinkButton
                        text="Documents"
                        href={`/company/pin-options/${typeLink}/${setID}/${id}/documents`}
                    />

                    <ActionMenu>
                        <ActionMenuActionButton text="Edit" onClick={() => console.log('edit')} />
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
};

export default OptionValuesListItem;
