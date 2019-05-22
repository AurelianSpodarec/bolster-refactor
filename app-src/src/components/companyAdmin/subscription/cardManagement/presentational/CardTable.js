import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CardsList from './CardsList';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

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
            noData={isFetching}
            noDataMessage="You have no cards set up."
        >
            <CardsList
                cards={cards}
                setPrimaryCard={setPrimaryCard}
                deleteCard={deleteCard}
            />
        </Table>
        <BlockButtonWrapper>
            <button className="button green" onClick={showModal}>
                <i className="fa fa-plus" />
                Add Card
            </button>
        </BlockButtonWrapper>
    </>
);

export default CardTable;
