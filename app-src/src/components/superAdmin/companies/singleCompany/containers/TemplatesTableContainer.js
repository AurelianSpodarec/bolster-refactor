import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class TempaltesTableContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <h2>hello</h2>
            </BlockContainer>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TempaltesTableContainer);
