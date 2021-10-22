import React from 'react';
import ListTable from './ListTable';

const ListView = ({ startDate, startEditPinTask }) => {
    return (
        <div className="list-view size-lg-12">
            <ListTable startDate={startDate} startEditPinTask={startEditPinTask} />
        </div>
    );
};

export default ListView;
