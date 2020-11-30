import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllContactSubmissions from 'actions/superAdmin/contactSubmissions/async/fetchAllContactSubmissions';
import AllContactSubmissions from '../presentational/AllContactSubmissions';

class AllContactSubmissionsContainer extends Component {
    render = () => <AllContactSubmissions />;

    componentDidMount = () => this.props.fetchAllContactSubmissions();
}

const mapDispatchToProps = { fetchAllContactSubmissions };

export default connect(null, mapDispatchToProps)(AllContactSubmissionsContainer);
