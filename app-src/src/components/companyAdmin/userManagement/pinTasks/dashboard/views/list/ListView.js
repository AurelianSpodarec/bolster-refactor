import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import React from 'react';
import ListTable from './ListTable';

const ListView = ({ startDate }) => {
    return (
        <div className="list-view size-lg-12">
            <BlockContainer contentClass="list">
                <ListTable />
            </BlockContainer>
        </div>
    );
};

export default ListView;
