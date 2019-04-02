import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorStats from '../presentational/FloorStats';

class FloorDetailsContainer extends Component {
    render() {
        const { floor, error, isFetching } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!floor.id}
            >
                <FloorStats floor={floor} />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ companyAdmin: { floorsReducer } }, { match }) => ({
    floor: floorsReducer.floors[match.params.id] || {},
    isFetching: floorsReducer.isFetching,
    error: floorsReducer.error
});

export default withRouter(connect(mapStateToProps)(FloorDetailsContainer));
