import React, { Component } from 'react';
import { connect } from 'react-redux';

import Home from '../presentational/Home';

export class HomeContainer extends Component {
    render() {
        return <Home />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);
