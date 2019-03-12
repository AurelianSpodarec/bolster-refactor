import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesTable from 'components/shared/operatives/presentational/OperativesTable';

import fetchOperatives from 'actions/operatives/async/fetchOperatives';

class DrawingOperativesAccessContainer extends Component {
    render() {
        const { props } = this;

        return <OperativesTable operatives={props.operatives} />;
    }

    componentDidMount = () => {
        this.props.fetchOperatives();
    };
}

const mapStateToProps = ({ operativesReducer }) => ({
    operatives: Object.values(operativesReducer.operatives),
    isFetching: operativesReducer.isFetching,
    error: operativesReducer.error
});

const mapDispatchToProps = dispatch => ({
    fetchOperatives: () => {
        dispatch(fetchOperatives());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawingOperativesAccessContainer);
