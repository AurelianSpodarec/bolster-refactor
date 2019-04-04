import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesTable from 'components/shared/operatives/presentational/OperativesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class DrawingOperativesAccessContainer extends Component {
    render() {
        const { operatives } = this.props;
        console.log(operatives);

        return (
            <BlockContainer>
                <OperativesTable operatives={operatives} />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ companyAdmin: { operativesReducer } }) => ({
    operatives: Object.values(operativesReducer.operatives),
    isFetching: operativesReducer.isFetching,
    error: operativesReducer.error
});

export default connect(mapStateToProps)(DrawingOperativesAccessContainer);
