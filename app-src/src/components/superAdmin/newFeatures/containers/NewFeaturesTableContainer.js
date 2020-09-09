import React from 'react';
import { connect } from 'react-redux';

import NewFeaturesTable from '../presentational/NewFeaturesTable';

function NewFeaturesTableContainer({ isFetching, error, newFeatures }) {
    return (
        <NewFeaturesTable
            headers={['Title', 'Short Description', 'Publish Date']}
            isFetching={isFetching}
            error={error}
            newFeatures={newFeatures}
        />
    );
}

const mapStateToProps = ({
    superAdmin: {
        newFeaturesReducer: { isFetching, error, newFeatures },
    },
}) => ({
    isFetching,
    error,
    newFeatures: Object.values(newFeatures),
});

export default connect(mapStateToProps)(NewFeaturesTableContainer);
