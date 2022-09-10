import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import { selectPinOptionType } from '../../../../../selectors/superAdmin/pinOptionTypes';

import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionMenu from 'components_DEPRECATED/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components_DEPRECATED/shared/actionMenu/ActionMenuActionButton';
import LinkButton from 'components_DEPRECATED/shared/generic/button/presentational/LinkButton';

const OptionValuesListItem = ({
    option,
    option: { id, name, priceBreaks },
    setID,
    typeID,
    showEditModal,
    showDeleteModal,
    showDuplicateModal,
}) => {
    const pinOptionType = useSelector(state => selectPinOptionType(state, typeID));
    const typeSlug = pinOptionType.slug;

    const hasPriceBreaks = pinOptionType.hasCosting && !isEmpty(priceBreaks);

    return (
        <tr>
            <td>{name}</td>
            <td>
                <ButtonWrapper alignment="right">
                    {hasPriceBreaks && <p className="button-wrapper-info disabled">£</p>}

                    <LinkButton
                        text="Documents"
                        href={`/admin/pin-options/${typeSlug}/${setID}/option/${id}/documents`}
                    />

                    <ActionMenu>
                        <ActionMenuActionButton text="Edit" onClick={() => showEditModal(option)} />
                        <ActionMenuActionButton
                            text="Duplicate"
                            onClick={() => showDuplicateModal(option)}
                        />
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
