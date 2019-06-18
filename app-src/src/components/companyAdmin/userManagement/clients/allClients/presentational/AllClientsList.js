import React from 'react';

import AllClientsListItemContainer from '../containers/AllClientsListItemContainer';

const AllClientsList = ({ clients, colCount }) => {
    return clients.map(client => (
        <AllClientsListItemContainer
            key={client.id}
            client={client}
            colCount={colCount}
        />
    ));
};
export default AllClientsList;
