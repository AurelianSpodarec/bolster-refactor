import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesTable from 'components/shared/operatives/presentational/OperativesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class DrawingOperativesAccessContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <OperativesTable operatives={props.operatives} />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ operativesReducer }) => ({
    operatives: Object.values(operativesReducer.operatives),
    isFetching: operativesReducer.isFetching,
    error: operativesReducer.error
});

export default connect(mapStateToProps)(DrawingOperativesAccessContainer);
