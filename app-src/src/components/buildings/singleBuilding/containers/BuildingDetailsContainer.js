import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class BuildingDetailsContainer extends Component {
    render() {
        // const { building, isFetching } = this.props;

        return (
            <BlockContainer>
                <h3 className="heading heading-3">
                    Buidling Details container
                </h3>
            </BlockContainer>
        );
    }
}

// const mapStateToProps = ({ buildingReducer }, { match }) => ({
//     building: buildingReducer.building[match.params.id] || {},
//     isFetching: buildingReducer.isFetching,
//     error: buildingReducer.error
// });

export default withRouter(connect()(BuildingDetailsContainer));
