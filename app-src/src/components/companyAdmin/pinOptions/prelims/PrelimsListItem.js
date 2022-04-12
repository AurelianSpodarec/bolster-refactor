import React from 'react';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import useColourTheme from 'hooks/useColourTheme';
import { PRELIMS_TYPES } from 'constants/companyAdmin/enums';
import percentSvg from '../../../../_content/images/frontend/percentIcon.svg';
import fixPriceSvg from '../../../../_content/images/frontend/fixPriceIcon.svg';
import fixPriceSvgForLightMode from '../../../../_content/images/frontend/fixPriceIconForLightMode.svg';
import percentSvgForLightMode from '../../../../_content/images/frontend/percentIconForLightMode.svg';

const PrelimsListItem = ({ set, showEditModal, showDeleteModal }) => {
    const colourTheme = useColourTheme();
    return (
        <tr key={set.id}>
            <td>{set.name}</td>
            <td>
                <img
                    src={
                        colourTheme === 'dark'
                            ? set.type === PRELIMS_TYPES.PERCENT
                                ? percentSvg
                                : fixPriceSvg
                            : set.type === PRELIMS_TYPES.PERCENT
                            ? percentSvgForLightMode
                            : fixPriceSvgForLightMode
                    }
                    alt="Type of payment"
                />
            </td>
            <td>{set.value}</td>

            <td>
                <ButtonWrapper alignment="right">
                    <ActionMenu>
                        <ActionMenuActionButton text="Edit" onClick={() => showEditModal(set)} />
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

export default PrelimsListItem;
