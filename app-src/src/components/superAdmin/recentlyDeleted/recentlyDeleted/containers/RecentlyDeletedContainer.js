import React from 'react';
import { connect } from 'react-redux';

import fetchRecentlyDeleted from 'actions/superAdmin/recentlyDeleted/async/fetchRecentlyDeleted';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import RecentlyDeleted from '../presentational/RecentlyDeleted';
import { componentDidMount } from 'helpers/generic';

const RecentlyDeletedContainer = ({ fetchRecentlyDeleted }) => {
    componentDidMount(fetchRecentlyDeleted);

    return <RecentlyDeleted />;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    fetchRecentlyDeleted,
    hideModal,
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyDeletedContainer);
