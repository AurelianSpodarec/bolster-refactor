import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleFloor from 'actions/floors/async/fetchSingleFloor';

import SingleFloor from '../presentational/SingleFloor';

class SingleFloorContainer extends Component {
    render() {
        return <SingleFloor />;
    }

    componentDidMount = () => {
        const { floorID, fetchSingleFloor } = this.props;
        fetchSingleFloor(floorID);
    };
}

const mapStateToProps = (_, { match }) => ({
    floorID: match.params['id']
});

const mapDispatchToProps = dispatch => ({
    fetchSingleFloor: id => {
        dispatch(fetchSingleFloor(id));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleFloorContainer);
