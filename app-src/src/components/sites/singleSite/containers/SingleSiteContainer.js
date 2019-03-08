import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllBuildings from 'actions/buildings/async/fetchAllBuildings';
import fetchSingleSite from 'actions/sites/async/fetchSingleSite';

import SingleSite from '../presentational/SingleSite';

class SingleSiteContainer extends Component {
    render() {
        return <SingleSite />;
    }
    componentDidMount = () => {
        this.props.fetchAllBuildings();
        this.props.fetchSingleSite();
    };
}

//make all fetches needed and this will update our redux store.
const mapDispatchToProps = dispatch => ({
    fetchAllBuildings: () => {
        dispatch(fetchAllBuildings());
    },
    fetchSingleSite: () => {
        dispatch(fetchSingleSite());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SingleSiteContainer);
