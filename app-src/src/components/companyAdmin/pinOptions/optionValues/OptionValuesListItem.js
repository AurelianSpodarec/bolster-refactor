import React from 'react';
import { useSelector } from 'react-redux';

import { CURRENCY_SYMBOLS } from 'constants/companyAdmin/enums';
import { isEmpty } from 'helpers/generic';

import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';

import withDrag from 'components/shared/dragDrop/hocs/withDrag';

import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ButtonWrapperInfo from 'components/shared/generic/button/presentational/ButtonWrapperInfo';

const OptionValuesListItem = ({
    option,
    option: { id, name, isDisabled, priceBreaks, isDeleted, companyID },
    setID,
    typeID,
    showEditModal,
    showDeleteModal,
    showDuplicateModal,
    showMoveModal,
    enableOptionValue,
    disableOptionValue,
    isSorting,
    isDragging,
    connectDropTarget,
    forwardRef,
    showHideModal,
    isCompanySet,
}) => {
    const company = useSelector(selectCompanySettings);
    const pinOptionType = useSelector(state => selectPinOptionType(state, typeID));
    const typeSlug = pinOptionType.slug;

    let rowClass = 'draggable expandable';
    if (isDragging) rowClass += ' dragging';

    const hasPriceBreaks = pinOptionType.hasCosting && !isEmpty(priceBreaks);

    const currencySymbol = CURRENCY_SYMBOLS[company.reportingCurrency] ?? '£';

    const isCompanyOption = !!companyID;

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
                            {isCompanyOption ? (
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
                            {hasPriceBreaks && (
                                <ButtonWrapperInfo text={currencySymbol} disabled large />
                            )}

                            {pinOptionType.hasDocuments && (
                                <LinkButton
                                    text="Documents"
                                    href={`/company/pin-options/${typeSlug}/${setID}/option/${id}/documents`}
                                    disabled={isSorting}
                                />
                            )}
                            <ActionMenu disabled={isSorting}>
                                <ActionMenuActionButton
                                    text="Duplicate"
                                    onClick={() => showDuplicateModal(option)}
                                />
                                <ActionMenuActionButton
                                    text="Move"
                                    onClick={() => showMoveModal(option)}
                                    disabled={!isCompanyOption}
                                    tooltip={
                                        !isCompanyOption
                                            ? 'This is a Bolster Systems created option and cannot be edited. Please duplicate the option first if you would like to make changes.'
                                            : null
                                    }
                                />
                                <ActionMenuActionButton
                                    text="Edit"
                                    onClick={() => showEditModal(option)}
                                    disabled={!isCompanyOption}
                                    tooltip={
                                        !isCompanyOption
                                            ? 'This is a Bolster Systems created option and cannot be edited. Please duplicate the option first if you would like to make changes.'
                                            : null
                                    }
                                />
                                <ActionMenuActionButton
                                    text="Delete"
                                    onClick={() => showDeleteModal(option)}
                                    isNegative
                                    disabled={!isCompanyOption}
                                    tooltip={
                                        !isCompanyOption
                                            ? 'This is a Bolster Systems created option and cannot be deleted.'
                                            : null
                                    }
                                />

                                {isCompanySet && (
                                    <ActionMenuActionButton
                                        text="Hide"
                                        onClick={() => showHideModal(option)}
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

export default withDrag(OptionValuesListItem, 'PIN_OPTION_VALUES');
