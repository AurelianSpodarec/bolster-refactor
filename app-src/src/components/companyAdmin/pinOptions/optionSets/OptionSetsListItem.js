import React from 'react';
import { Link } from 'react-router-dom';

import withDrag from 'components/shared/dragDrop/hocs/withDrag';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ButtonWrapperInfo from 'components/shared/generic/button/presentational/ButtonWrapperInfo';

const OptionSetsListItem = ({
    set,
    set: { id, name, isDefault, isDisabled, isDeleted },
    setLink,
    showEditModal,
    showDeleteModal,
    showDuplicateModal,
    enableOptionSet,
    disableOptionSet,
    setAsDefault,
    isSorting,
    isDragging,
    connectDropTarget,
    forwardRef,
    isCompanySet,
    showHideModal,
}) => {
    let rowClass = 'draggable expandable';
    if (isDragging) rowClass += ' dragging';

    return (
        <>
            {connectDropTarget(
                <tr
                    className={rowClass}
                    ref={isSorting ? forwardRef : null}
                    style={{ display: isSorting && isDeleted ? 'none' : 'table-row' }} // setting as hidden here rather than filtering so sort mode still works
                >
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
                                disabled={isSorting}
                            />
                            <Link
                                className="checkbox-text link"
                                to={`/company/pin-options/${setLink}/${id}`}
                            >
                                {name}
                            </Link>
                        </FlexWrapper>
                    </td>
                    <td>
                        <ButtonWrapper alignment="right">
                            {isDefault && (
                                <ButtonWrapperInfo
                                    text="Default"
                                    ambient="positive"
                                    removeSpacing
                                />
                            )}

                            <ActionMenu disabled={isSorting}>
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
                                            ? 'This is a Bolster Systems created set and cannot be deleted.'
                                            : null
                                    }
                                />

                                {!isCompanySet && (
                                    <ActionMenuActionButton
                                        text="Hide"
                                        onClick={() => showHideModal(set)}
                                        isNegative
                                    />
                                )}
                            </ActionMenu>
                        </ButtonWrapper>
                    </td>
                </tr>,
            )}
        </>
    );
};

export default withDrag(OptionSetsListItem, 'PIN_OPTION_SETS');
