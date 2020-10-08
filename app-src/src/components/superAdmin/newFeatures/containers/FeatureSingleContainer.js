import React, { useEffect } from 'react';
import FeatureSingle from '../presentational/FeatureSingle';
import fetchSingleFeature from 'actions/superAdmin/newFeatures/fetchSingleFeature';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const FeatureSingleContainer = ({ fetchSingleFeature, id }) => {
    useEffect(() => {
        fetchSingleFeature(id);
    }, []);

    return <FeatureSingle />;
};

const mapDispatchToProps = {
    fetchSingleFeature,
};

export default withRouter(
    connect(
        (_, { match }) => ({ id: match.params.id }),
        mapDispatchToProps,
    )(FeatureSingleContainer),
);
