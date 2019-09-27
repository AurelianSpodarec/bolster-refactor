import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecentlyDeleted from '../presentational/RecentlyDeleted';
import fetchRecentlyDeleted from 'actions/companyAdmin/recentlyDeleted/async/fetchRecentlyDeleted';

class RecentlyDeletedContainer extends Component {
    render() {
        return <RecentlyDeleted />;
    }

    componentDidMount = () => {
        const { fetchRecentlyDeleted } = this.props;

        fetchRecentlyDeleted();
    };
}

const mapDispatchToProps = {
    fetchRecentlyDeleted
};

export default connect(
    null,
    mapDispatchToProps
)(RecentlyDeletedContainer);
