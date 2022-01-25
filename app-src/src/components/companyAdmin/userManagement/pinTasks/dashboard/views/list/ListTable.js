import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import { isEmpty } from 'helpers/generic';
import ListTableRow from './ListTableRow';

const ListTable = ({ startEditPinTask, pinTasks, isFetching, error }) => {
    const headers = ['Operative', 'Drawing', 'Pin Number', 'Due Date', 'Action Date', 'Tags'];

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
