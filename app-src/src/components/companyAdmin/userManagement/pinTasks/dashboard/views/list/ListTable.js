import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import { isEmpty } from 'helpers/generic';
import React from 'react';
import useList from './hooks/useList';
import ListTableRow from './ListTableRow';

const ListTable = ({ startDate, startEditPinTask }) => {
    const headers = ['Operative', 'Drawing', 'Pin Number', 'Due Date', 'Action Date', 'Tags'];

    const { pinTasks, isFetching, error } = useList(startDate);

    return (
        <BlockContainer
            contentClass="list"
            isFetching={isFetching}
            error={error}
            isEmpty={isEmpty(pinTasks)}
        >
            <Table headers={headers}>
                {pinTasks.map((pinTask, i) => (
                    <ListTableRow key={i} pinTask={pinTask} startEditPinTask={startEditPinTask} />
                ))}
            </Table>
        </BlockContainer>
    );
};

export default ListTable;
