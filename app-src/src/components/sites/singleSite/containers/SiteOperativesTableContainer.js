import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesTable from 'components/shared/operatives/presentational/OperativesTable';

class OperativesTableContainer extends Component {
    render() {
        const { props } = this;

        return (
            <OperativesTable
                operatives={props.operatives}
                isFetching={props.isFetching}
                error={props.error}
            />
        );
    }
}

const mapStateToProps = ({ operativesReducer }) => ({
    operatives: Object.values(operativesReducer.operatives),
    isFetching: operativesReducer.isFetching,
    error: operativesReducer.error
});

export default connect(mapStateToProps)(OperativesTableContainer);
