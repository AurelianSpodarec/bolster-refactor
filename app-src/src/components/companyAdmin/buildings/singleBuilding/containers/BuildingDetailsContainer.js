import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BuildingStats from '../presentational/BuildingStats';

class BuildingDetailsContainer extends Component {
    render() {
        const { building, isFetching, error } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!building.id}
            >
                <BuildingStats building={building} />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    { companyAdmin: { buildingsReducer } },
    { match }
) => ({
    building: buildingsReducer.buildings[match.params.id] || {},
    isFetching: buildingsReducer.isFetching,
    error: buildingsReducer.error
});

export default withRouter(connect(mapStateToProps)(BuildingDetailsContainer));
