import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class ProfileContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <p>##To do##</p>
            </BlockContainer>
        );
    }
}

export default connect()(ProfileContainer);
