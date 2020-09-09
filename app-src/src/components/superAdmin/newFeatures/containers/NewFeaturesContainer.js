import React from 'react';
import { connect } from 'react-redux';

import NewFeatures from '../presentational/NewFeatures';
import fetchAllNewFeatures from 'actions/superAdmin/newFeatures/async/fetchAllNewFeatures';

function NewFeaturesContainer() {
    return <NewFeatures />;
}

const mapDispatchToProps = {
    fetchAllNewFeatures,
};

export default connect(null, mapDispatchToProps)(NewFeaturesContainer);
