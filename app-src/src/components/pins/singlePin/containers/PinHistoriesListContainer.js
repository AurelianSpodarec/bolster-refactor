import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PinHistoriesList from '../presentational/PinHistoriesList';

const PinHistoriesListContainer = ({ history }) => {
    return <PinHistoriesList />;
};

export default withRouter(connect(() => ({}))(PinHistoriesListContainer));
