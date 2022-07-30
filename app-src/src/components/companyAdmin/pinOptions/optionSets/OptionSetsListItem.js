import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import withDrag from 'components/shared/dragDrop/hocs/withDrag';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ButtonWrapperInfo from 'components/shared/generic/button/presentational/ButtonWrapperInfo';
import setOptionSetAsHidden from 'actions/companyAdmin/pinOptions/async/setOptionSetAsHidden';
import setOptionSetAsNotHidden from 'actions/companyAdmin/pinOptions/async/setOptionSetAsNotHidden';

const OptionSetsListItem = ({
    set,
    set: { id, name, isDefault, isDisabled, isDeleted, isHidden },
    setLink,
    showEditModal,
    showDeleteModal,
    showDuplicateModal,
    showMergeModal,
    enableOptionSet,
    disableOptionSet,
    setAsDefault,
    removeAsDefault,
    isSorting,
    isDragging,
    connectDropTarget,
    forwardRef,
    isCompanySet,
    tableColumnWidths,
    parentType,
}) => {
    const dispatch = useDispatch();
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
                    <td
                        className="row-link w-checkbox"
                        style={{
                            width: tableColumnWidths.length ? tableColumnWidths[0] : 'auto',
                            paddingRight: 0,
                        }}
                    >
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
                    <td
                        style={{
                            width: tableColumnWidths.length ? tableColumnWidths[1] : 'auto',
                            paddingLeft: 0,
                        }}
                    >
                        <ButtonWrapper alignment="right">
                            {isDefault && parentType.hasSiteLinks && (
                                <ButtonWrapperInfo
                                    text="Default"
                                    ambient="positive"
                                    removeSpacing
                                />
                            )}

                            <ActionMenu disabled={isSorting}>
                                {parentType.hasSiteLinks && (
                                    <>
                                        {isDefault ? (
                                            <ActionMenuActionButton
                                                text="Remove as default"
                                                onClick={() => removeAsDefault(set)}
                                            />
                                        ) : (
                                            <ActionMenuActionButton
                                                text="Set as default"
                                                onClick={() => setAsDefault(set)}
                                            />
                                        )}
                                    </>
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
                                    text="Merge"
                                    onClick={() => showMergeModal(set)}
                                    disabled={!isCompanySet}
                                    tooltip={
                                        !isCompanySet
                                            ? 'This is a Bolster Systems created set and cannot be merged. Please duplicate the set first if you would like to make changes.'
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
                                        text={isHidden ? 'Unhide' : 'Hide'}
                                        onClick={
                                            isHidden
                                                ? () => dispatch(setOptionSetAsNotHidden(set))
                                                : () => dispatch(setOptionSetAsHidden(set))
                                        }
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
