import React, { Component } from 'react';
import { connect } from 'react-redux';

// import fetchDeletedDrawings from 'actions/companyAdmin/drawings/async/fetchDeletedDrawings';
// import fetchDeletedPinHistories from 'actions/companyAdmin/pins/async/fetchDeletedPinHistories';

import RecentlyDeleted from '../presentational/RecentlyDeleted';
import fetchRecentlyDeleted from 'actions/companyAdmin/recentlyDeleted/fetchRecentlyDeleted';

class RecentlyDeletedContainer extends Component {
    render() {
        return <RecentlyDeleted />;
    }

    componentDidMount = () => {
        const { fetchRecentlyDeleted } = this.props;

        fetchRecentlyDeleted();
        // fetchDeletedDrawings();
        // fetchDeletedPinHistories();
    };
}

const mapDispatchToProps = {
    fetchRecentlyDeleted
    // fetchDeletedDrawings,
    // fetchDeletedPinHistories
};

export default connect(
    null,
    mapDispatchToProps
)(RecentlyDeletedContainer);
