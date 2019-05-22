import React from 'react';
import { withRouter } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const CardListItem = ({
    card: { expMonth, expYear, isPrimary, lastFour, name, id },
    setPrimaryCard,
    deleteCard
}) => {
    const expMonthString = expMonth + '';

    return (
        <tr>
            <td>{name}</td>
            <td>{`XXXX-XXXX-XXXX-${lastFour}`}</td>
            <td>{`${expMonthString.padStart(2, '0')}/${expYear}`}</td>
            <td>
                {<i className={isPrimary ? 'fa fa-check' : 'fa fa-times'} />}
            </td>
            <td>
                <BlockButtonWrapper>
                    {!isPrimary && (
                        <ButtonContainer handleClick={setPrimaryCard}>
                            Make Primary
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
