import React, { Component } from 'react';
import { connect } from 'react-redux';
import BuildingClientAccess from '../presentational/BuildingClientAccess';

class BuildingClientAccessContainer extends Component {
    render() {
        return <BuildingClientAccess />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildingClientAccessContainer);
