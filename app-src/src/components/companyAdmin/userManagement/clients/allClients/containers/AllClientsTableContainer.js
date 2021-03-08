import React from 'react';
import { useSelector } from 'react-redux';

import AllClientsTable from '../presentational/AllClientsTable';

const AllClientTableContainer = () => {
    const { clients, isFetching, error } = useSelector(mapStateToProps);

    return (
        <AllClientsTable
            headers={['Name', 'Company name', 'Drawing', 'Services', '']}
            clients={_sortClientsList()}
            isFetching={isFetching}
            error={error}
        />
    );

    function _sortClientsList() {
        return [...clients].sort(orderByProperty('userID', 'companyName'));
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
        clientsReducer: { clients = {}, isFetching, error },
    },
}) => ({
    isFetching,
    error,
    clients: Object.values(clients),
});

export default AllClientTableContainer;
