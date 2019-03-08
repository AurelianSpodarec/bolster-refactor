import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllBuildings from 'actions/buildings/async/fetchAllBuildings';

import SingleSite from '../presentational/SingleSite';

class SingleSiteContainer extends Component {
    render() {
        return <SingleSite />;
    }
}

//make all fetches needed and this will update our redux store.
const mapDispatchToProps = dispatch => ({
    fetchAllBuildings: () => {
        dispatch(fetchAllBuildings());
    }
    // fetchSite: () => {
    //     dispatch(fetchSite());
    // }
});

export default connect(
    null,
    mapDispatchToProps
)(SingleSiteContainer);
