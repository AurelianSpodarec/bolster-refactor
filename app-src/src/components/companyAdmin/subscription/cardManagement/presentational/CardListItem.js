import React from 'react';
import { withRouter } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const CardListItem = ({
    card: { expMonth, expYear, isPrimary, lastFour, name },
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
                <button className="button red" onClick={deleteCard}>
                    <i className="fa fa-times" />
                    Delete
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default withRouter(CardListItem);
