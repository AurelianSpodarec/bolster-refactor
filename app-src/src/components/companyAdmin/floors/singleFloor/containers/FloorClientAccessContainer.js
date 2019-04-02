import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloorClientAccess from '../presentational/FloorClientAccess';

class FloorClientAccessContainer extends Component {
    render() {
        return <FloorClientAccess />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FloorClientAccessContainer);
