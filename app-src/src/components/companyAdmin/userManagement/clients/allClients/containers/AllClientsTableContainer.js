import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllClientsTable from '../presentational/AllClientsTable';

class AllClientTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;

        return (
            <AllClientsTable
                headers={['Name', 'Company name', 'Drawing', 'Services', '']}
                clients={this._sortClientsList()}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    _sortClientsList = () => {
        const { clients } = this.props;

        return [...clients].sort(orderByProperty('userID', 'companyName'));
    };
}

function orderByProperty(prop) {
    const args = Array.prototype.slice.call(arguments, 1);
    return function(a, b) {
        const equality = a[prop] - b[prop];
        if (equality === 0 && arguments.length > 1) {
            return orderByProperty.apply(null, args)(a, b);
        }
        return equality;
    };
}

const mapStateToProps = ({
    companyAdmin: {
        clientsReducer: { clients, isFetching, error, postSuccess }
    }
}) => ({
    isFetching,
    error,
    postSuccess,
    clients: Object.values(clients) || []
});

export default connect(mapStateToProps)(AllClientTableContainer);
