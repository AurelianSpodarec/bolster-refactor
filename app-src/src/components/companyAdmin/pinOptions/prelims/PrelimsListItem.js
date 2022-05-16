import React from 'react';
import { useSelector } from 'react-redux';

import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import { CURRENCY_SYMBOLS } from 'constants/companyAdmin/enums';
import CurrencyIcon from 'components/shared/currencyIcon/CurrencyIcon';

const PrelimsListItem = ({ set, showEditModal, showDeleteModal }) => {
    const company = useSelector(selectCompanySettings);

    return (
        <tr key={set.id}>
            <td>{set.name}</td>

            <td>
                <CurrencyIcon currency={CURRENCY_SYMBOLS[company.reportingCurrency]} />
            </td>
            <td>{set.value}</td>

            <td>
                <ButtonWrapper alignment="right">
                    <ActionMenu>
                        <ActionMenuActionButton text="Edit" onClick={() => showEditModal(set)} />
                        <ActionMenuActionButton
                            text="Delete"
                            onClick={() => showDeleteModal(set)}
                            isNegative
                        />
                    </ActionMenu>
                </ButtonWrapper>
            </td>
        </tr>
    );
};

export default PrelimsListItem;
