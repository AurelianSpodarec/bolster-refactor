import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CardsList from './CardsList';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const CardTable = ({
    headers,
    cards,
    error,
    isFetching,
    showModal,
    setPrimaryCard,
    deleteCard,
    onMobile,
}) => (
    <>
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!cards.length}
            noDataMessage="You have no cards set up."
        >
            <CardsList
                cards={cards}
                setPrimaryCard={setPrimaryCard}
                deleteCard={deleteCard}
                onMobile={onMobile}
                headers={headers}
            />
        </Table>
        <ButtonWrapper alignment="right">
            <ActionButton
                icon="plus"
                onClick={showModal}
                text="Add card"
                size="small"
                ambient="positive"
            />
        </ButtonWrapper>
    </>
);

export default CardTable;
