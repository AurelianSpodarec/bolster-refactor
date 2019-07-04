import React from 'react';

import AllClientsListItemContainer from '../containers/AllClientsListItemContainer';

const AllClientsList = ({ clients, colCount, headers }) => {
    return clients.map(client => (
        <AllClientsListItemContainer
            key={client.id}
            client={client}
            colCount={colCount}
            headers={headers}
        />
    ));
};
export default AllClientsList;
