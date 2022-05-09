import React from 'react';
import { Link } from 'react-router-dom';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const OptionSetsListItem = ({
    set,
    set: { id, name, isDefault, isDisabled },
    setLink,
    showEditModal,
    showDeleteModal,
    showDuplicateModal,
    enableOptionSet,
    disableOptionSet,
    setAsDefault,
    isCompanySet,
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
                <Link className="checkbox-text link" to={`/company/pin-options/${setLink}/${id}`}>
                    {name} {isDefault ? '(default)' : ''}
                </Link>
            </FlexWrapper>
        </td>
        <td>
            <ButtonWrapper alignment="right">
                <ActionMenu disabled={isDefault && !isCompanySet}>
                    {!isDefault && (
                        <ActionMenuActionButton
                            text="Set as default"
                            onClick={() => setAsDefault(set)}
                        />
                    )}

                    <ActionMenuActionButton
                        text="Duplicate"
                        onClick={() => showDuplicateModal(set)}
                    />

                    {isCompanySet && (
                        <>
                            <ActionMenuActionButton
                                text="Edit"
                                onClick={() => showEditModal(set)}
                            />
                            <ActionMenuActionButton
                                text="Delete"
                                onClick={() => showDeleteModal(set)}
                                isNegative
                            />
                        </>
                    )}
                </ActionMenu>
            </ButtonWrapper>
        </td>
    </tr>
);

export default OptionSetsListItem;
