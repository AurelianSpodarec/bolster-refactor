import React from 'react';
import { useSelector } from 'react-redux';

import AllClientsTable from '../presentational/AllClientsTable';

const AllClientTableContainer = () => {
    const { clientUsers, isFetching, error } = useSelector(mapStateToProps);

    return (
        <AllClientsTable
            headers={['Name', 'Company', 'Phone', 'Last login date', 'Latest report date', '']}
            clients={_sortClientsList()}
            isFetching={isFetching}
            error={error}
        />
    );

    function _sortClientsList() {
        return [...clientUsers].sort(orderByProperty('userID', 'companyName'));
    }
};

function orderByProperty(prop) {
    const args = Array.prototype.slice.call(arguments, 1);
    return function (a, b) {
        const equality = a[prop] - b[prop];
        if (equality === 0 && arguments.length > 1) {
            return orderByProperty.apply(null, args)(a, b);
        }
        return equality;
    };
}

const mapStateToProps = ({
    companyAdmin: {
        clientsReducer: { clients = {}, clientUsers, isFetching, error },
    },
}) => ({
    isFetching,
    error,
    clientUsers: Object.values(clientUsers),
    clients: Object.values(clients),
});

export default AllClientTableContainer;
