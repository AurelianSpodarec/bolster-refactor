import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DrawingsUsersContainer extends Component {
    render() {
        return <p>hihi</p>;
    }
}

export default withRouter(connect()(DrawingsUsersContainer));
