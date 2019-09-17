import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchDeletedDrawings from 'actions/companyAdmin/drawings/async/fetchDeletedDrawings';
import fetchDeletedPinHistories from 'actions/companyAdmin/pins/async/fetchDeletedPinHistories';

import RecentlyDeleted from '../presentational/RecentlyDeleted';

class RecentlyDeletedContainer extends Component {
    render() {
        return <RecentlyDeleted />;
    }

    componentDidMount = () => {
        const { fetchDeletedDrawings, fetchDeletedPinHistories } = this.props;

        fetchDeletedDrawings();
        fetchDeletedPinHistories();
    };
}

const mapDispatchToProps = {
    fetchDeletedDrawings,
    fetchDeletedPinHistories
};

export default connect(
    null,
    mapDispatchToProps
)(RecentlyDeletedContainer);
