import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesTable from 'components/shared/operatives/presentational/OperativesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class OperativesTableContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <OperativesTable
                    operatives={props.operatives}
                    isFetching={props.isFetching}
                    error={props.error}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ companyAdmin: { operativesReducer } }) => ({
    operatives: Object.values(operativesReducer.operatives),
    isFetching: operativesReducer.isFetching,
    error: operativesReducer.error
});

export default connect(mapStateToProps)(OperativesTableContainer);
