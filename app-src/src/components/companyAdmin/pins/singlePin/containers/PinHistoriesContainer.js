import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PinHistoriesListContainer from './PinHistoriesListContainer';

class PinHistoriesContainer extends Component {
    render() {
        const { pin, isFetching, error } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!pin.id}
                contentClass="pin-single-history no-horizontal-padding"
            >
                <PinHistoriesListContainer />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ companyAdmin: { pinsReducer } }, { match }) => ({
    isFetching: pinsReducer.isFetching,
    error: pinsReducer.error,
    pin: pinsReducer.pins[match.params.id] || []
});

export default withRouter(connect(mapStateToProps)(PinHistoriesContainer));
