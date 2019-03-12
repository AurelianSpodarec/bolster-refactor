import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesTable from 'components/shared/operatives/presentational/OperativesTable';

class DrawingOperativesAccessContainer extends Component {
    render() {
        const { props } = this;

        return <OperativesTable operatives={props.operatives} />;
    }
}

const mapStateToProps = ({ operativesReducer }) => ({
    operatives: Object.values(operativesReducer.operatives),
    isFetching: operativesReducer.isFetching,
    error: operativesReducer.error
});

export default connect(mapStateToProps)(DrawingOperativesAccessContainer);
