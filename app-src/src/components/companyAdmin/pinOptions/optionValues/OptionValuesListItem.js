import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';

import withDrag from 'components/shared/dragDrop/hocs/withDrag';

import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const OptionValuesListItem = ({
    option,
    option: { id, name, isDisabled, priceBreaks, isDeleted },
    setID,
    typeID,
    showEditModal,
    showDeleteModal,
    enableOptionValue,
    disableOptionValue,
    isSorting,
    isDragging,
    connectDropTarget,
    forwardRef,
    isCompanySet,
}) => {
    const pinOptionType = useSelector(state => selectPinOptionType(state, typeID));
    const typeSlug = pinOptionType.slug;

    let rowClass = 'draggable expandable';
    if (isDragging) rowClass += ' dragging';

    const hasPriceBreaks = pinOptionType.hasCosting && !isEmpty(priceBreaks);

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
                                name={`pin-option-checkbox-${id}`}
                                checked={!isDisabled}
                                handleChange={(_, value) => {
                                    if (value) {
                                        enableOptionValue(option);
                                    } else {
                                        disableOptionValue(option);
                                    }
                                }}
                                disabled={isSorting}
                                keepTextColorOnDisable
                            />
                            {isCompanySet ? (
                                <button
                                    className="checkbox-text link"
                                    onClick={() => showEditModal(option)}
                                >
                                    {name}
                                </button>
                            ) : (
                                <p className="checkbox-text">{name}</p>
                            )}
                        </FlexWrapper>
                    </td>
                    <td>
                        <ButtonWrapper alignment="right">
                            {hasPriceBreaks && <p className="button-wrapper-info disabled">£</p>}

                            {pinOptionType.hasDocuments && (
                                <LinkButton
                                    text="Documents"
                                    href={`/company/pin-options/${typeSlug}/${setID}/option/${id}/documents`}
                                    disabled={isSorting}
                                />
                            )}

                            {isCompanySet && (
                                <ActionMenu disabled={isSorting}>
                                    <ActionMenuActionButton
                                        text="Delete"
                                        onClick={() => showDeleteModal(option)}
                                        isNegative
                                    />
                                </ActionMenu>
                            )}
                        </ButtonWrapper>
                    </td>
                </tr>,
            )}
        </>
    );
};

export default withDrag(OptionValuesListItem, 'PIN_OPTION_VALUES');
