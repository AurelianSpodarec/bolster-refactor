import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CardsList from './CardsList';

const CardTable = ({ headers, cards, error, isFetching }) => (
    <>
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!cards.length}
            noDataMessage="No Cards"
        >
            <CardsList cards={cards} />
        </Table>
        <button className="button">
            <i className="fa fa-plus" />
            Add Card
        </button>
    </>
);

export default CardTable;
