import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawing from '../presentational/Drawing';

class DrawingContainer extends Component {
    render() {
        return <Drawing />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawingContainer);
