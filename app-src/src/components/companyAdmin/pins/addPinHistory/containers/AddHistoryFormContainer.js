import React, { Component } from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AddHistoryForm from '../presentational/AddHistoryForm';

class AddHistoryFromContainer extends Component {
    render() {
        return (
            <BlockContainer heading="Add history">
                <AddHistoryForm />
            </BlockContainer>
        );
    }
}

export default AddHistoryFromContainer;
