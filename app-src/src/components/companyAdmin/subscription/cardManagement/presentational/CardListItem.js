import React from 'react';
import { withRouter } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';

const CardListItem = ({
    card: { expMonth, expYear, isPrimary, lastFour, name, id, nickname },
    setPrimaryCard,
    deleteCard
}) => {
    const expMonthString = expMonth + '';

    return (
        <tr>
            <td>{name}</td>
            <td>{nickname}</td>
            <td>{`XXXX-XXXX-XXXX-${lastFour}`}</td>
            <td>{`${expMonthString.padStart(2, '0')}/${expYear}`}</td>
            <td className="center-align">
                {isPrimary ? (
                    <StatusIcon />
                ) : (
                    <StatusIcon classes="times" iconClass="fa fa-times" />
                )}
            </td>
            <td>
                <BlockButtonWrapper additionalClasses="card-buttons">
                    {!isPrimary && (
                        <ButtonContainer handleClick={setPrimaryCard}>
                            Set Primary
                        </ButtonContainer>
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
