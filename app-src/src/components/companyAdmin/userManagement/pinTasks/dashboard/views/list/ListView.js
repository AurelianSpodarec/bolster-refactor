import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import React from 'react';
import ListTable from './ListTable';

const ListView = ({ startDate, startEditPinTask }) => {
    return (
        <div className="list-view size-lg-12">
            <BlockContainer contentClass="list">
                <ListTable startEditPinTask={startEditPinTask} />
            </BlockContainer>
        </div>
    );
};

export default ListView;
