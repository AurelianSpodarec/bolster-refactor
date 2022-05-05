import React from 'react';
import { withRouter } from 'react-router-dom';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const CardListItem = ({
    card: { expMonth, expYear, isPrimary, lastFour, name, id },
    setPrimaryCard,
    onMobile,
    headers,
    deleteCard,
}) => {
    const expMonthString = expMonth + '';

    return (
        <tr>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {name}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                {`XXXX-XXXX-XXXX-${lastFour}`}
            </td>
            <td>
                {' '}
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                {`${expMonthString.padStart(2, '0')}/${expYear}`}
            </td>
            {onMobile ? (
                <td>
                    {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
                    {isPrimary ? (
                        <StatusIcon />
                    ) : (
                        <StatusIcon classes="times" iconClass="fa fa-times" />
                    )}
                </td>
            ) : (
                <td className="center-align">
                    {isPrimary ? (
                        <StatusIcon />
                    ) : (
                        <StatusIcon classes="times" iconClass="fa fa-times" />
                    )}
                </td>
            )}

            <td>
                {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
                <ButtonWrapper alignment="right">
                    {!isPrimary && (
                        <ActionButton text="Set Primary" size="small" onClick={setPrimaryCard} />
                    )}

                    <ActionButton
                        source="secondary"
                        ambient="positive"
                        iconOnly
                        icon="trash-alt"
                        iconWeight="light"
                        size="small"
                        onClick={() => {
                            deleteCard(id);
                        }}
                    />
                </ButtonWrapper>
            </td>
        </tr>
    );
};

export default withRouter(CardListItem);
