import React from 'react';
import { withRouter } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';

const CardListItem = ({
    card: { expMonth, expYear, isPrimary, lastFour, name, id },
    setPrimaryCard,
    onMobile,
    headers,
    deleteCard
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
                <BlockButtonWrapper additionalClasses="card-buttons">
                    {!isPrimary && (
                        <ButtonContainer handleClick={setPrimaryCard}>Set Primary</ButtonContainer>
                    )}
                    <button
                        className="button icon-only red"
                        onClick={() => {
                            deleteCard(id);
                        }}
                    >
                        <i className="far fa-trash-alt" />
                    </button>
                </BlockButtonWrapper>
            </td>
        </tr>
    );
};

export default withRouter(CardListItem);
