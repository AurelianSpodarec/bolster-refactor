import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import withDrag from 'components/shared/dragDrop/hocs/withDrag';

import { selectPinOptionType } from '../../../../selectors/superAdmin/pinOptionTypes';

import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';

const OptionValuesListItem = ({
    option,
    option: { id, name, isDisabled, priceBreaks },
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
}) => {
    const pinOptionType = useSelector(state => selectPinOptionType(state, typeID));
    const typeSlug = pinOptionType.slug;

    let rowClass = 'draggable expandable';
    if (isDragging) rowClass += ' dragging';

    const hasPriceBreaks = pinOptionType.hasCosting && !isEmpty(priceBreaks);

    return (
        <>
            {connectDropTarget(
                <tr className={rowClass} ref={isSorting ? forwardRef : null}>
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
                            disabled={isSorting}
                            keepTextColorOnDisable
                        />
                    </td>
                    <td>
                        <ButtonWrapper alignment="right">
                            {hasPriceBreaks && <p className="button-wrapper-info disabled">£</p>}

                            <LinkButton
                                text="Documents"
                                href={`/admin/pin-options/${typeSlug}/${setID}/option/${id}/documents`}
                                disabled={isSorting}
                            />

                            <ActionMenu disabled={isSorting}>
                                <ActionMenuActionButton
                                    text="Edit"
                                    onClick={() => showEditModal(option)}
                                />
                                <ActionMenuActionButton
                                    text="Delete"
                                    onClick={() => showDeleteModal(option)}
                                    isNegative
                                />
                            </ActionMenu>
                        </ButtonWrapper>
                    </td>
                </tr>,
            )}
        </>
    );
};

export default withDrag(OptionValuesListItem, 'PIN_OPTION_VALUES');
