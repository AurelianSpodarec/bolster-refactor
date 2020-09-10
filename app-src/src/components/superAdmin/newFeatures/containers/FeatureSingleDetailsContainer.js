import React from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { withRouter } from 'react-router-dom';
import FeatureSingleDetails from '../presentational/FeatureSingleDetails';

function FeatureSingleDetailsContainer({ feature }) {
    return (
        <>
            <BlockContainer>
                <FeatureSingleDetails feature={feature} />
            </BlockContainer>
        </>
    );
}

const mapStateToProps = ({ superAdmin: { newFeaturesReducer } }, { match }) => ({
    feature: newFeaturesReducer.newFeatures[match.params.id] || {},
    isFetching: newFeaturesReducer.isFetching,
    error: newFeaturesReducer.error,
});

export default withRouter(connect(mapStateToProps)(FeatureSingleDetailsContainer));
