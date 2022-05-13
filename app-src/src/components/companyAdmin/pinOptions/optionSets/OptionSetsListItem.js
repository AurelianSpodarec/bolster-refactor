import React from 'react';
import { Link } from 'react-router-dom';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ButtonWrapperInfo from 'components/shared/generic/button/presentational/ButtonWrapperInfo';

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
                    {name}
                </Link>
            </FlexWrapper>
        </td>
        <td>
            <ButtonWrapper alignment="right">
                {isDefault && <ButtonWrapperInfo text="Default" ambient="positive" removeSpacing />}

                <ActionMenu>
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

                    <ActionMenuActionButton
                        text="Edit"
                        onClick={() => showEditModal(set)}
                        disabled={!isCompanySet}
                        tooltip={
                            !isCompanySet
                                ? 'This is a Bolster Systems created set and cannot be edited. Please duplicate the set first if you would like to make changes.'
                                : null
                        }
                    />
                    <ActionMenuActionButton
                        text="Delete"
                        onClick={() => showDeleteModal(set)}
                        isNegative
                        disabled={!isCompanySet}
                        tooltip={
                            !isCompanySet
                                ? 'This is a Bolster Systems created set and cannot be deleted'
                                : null
                        }
                    />
                </ActionMenu>
            </ButtonWrapper>
        </td>
    </tr>
);

export default OptionSetsListItem;
