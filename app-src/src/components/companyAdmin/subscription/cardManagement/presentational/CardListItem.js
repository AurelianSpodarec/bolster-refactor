import React from 'react';
import { withRouter } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const CardListItem = ({
    card: { expMonth, expYear, isPrimary, lastFour, name, id },
    setPrimaryCard,
    deleteCard
}) => (
    <tr>
        <td>{name}</td>
        <td>{`XXXX-XXXX-XXXX-${lastFour}`}</td>
        <td>{`${expMonth}/${expYear}`}</td>
        <td>{<i className={isPrimary ? 'fa fa-check' : 'fa fa-times'} />}</td>
        <td>
            <BlockButtonWrapper>
                {!isPrimary && (
                    <button className="button" onClick={setPrimaryCard}>
                        Make Primary
                    </button>
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

export default withRouter(CardListItem);
