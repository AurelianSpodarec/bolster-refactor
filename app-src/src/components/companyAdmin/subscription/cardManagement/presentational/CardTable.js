import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CardsList from './CardsList';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
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
        <BlockButtonWrapper>
            <ButtonWrapper alignment="right">
                <ActionButton text="Add Card" icon="plus" ambient="positive" onClick={showModal} />
            </ButtonWrapper>
        </BlockButtonWrapper>
    </>
);

export default CardTable;
