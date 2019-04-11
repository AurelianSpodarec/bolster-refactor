import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CardsList from './CardsList';

const CardTable = ({
    headers,
    cards,
    error,
    isFetching,
    showModal,
    setPrimaryCard,
    deleteCard
}) => (
    <>
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!cards.length}
            noDataMessage="No Cards"
        >
            <CardsList
                cards={cards}
                setPrimaryCard={setPrimaryCard}
                deleteCard={deleteCard}
            />
        </Table>
        <button className="button" onClick={showModal}>
            <i className="fa fa-plus" />
            Add Card
        </button>
    </>
);

export default CardTable;
