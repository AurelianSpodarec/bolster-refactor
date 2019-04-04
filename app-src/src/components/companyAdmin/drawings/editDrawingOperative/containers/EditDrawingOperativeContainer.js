import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default class EditDrawingOperative extends Component {
    render() {
        const { id, operativeID } = this.props.match.params;
        return <p>EDIT OPERATIVE</p>;
    }
}
