import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchGenerationQueue from 'actions/generationQueue/async/fetchGenerationQueue';
import GenerationQueue from '../presentational/GenerationQueue';

class GenerationQueueContainer extends Component {
    render = () => <GenerationQueue />;

    componentDidMount() {
        this.props.fetchGenerationQueue();
    }

    // ? update queue on timer / live / refresh button
}

const mapDispatchToProps = dispatch => ({
    fetchGenerationQueue: () => {
        dispatch(fetchGenerationQueue);
    }
});

export default connect(
    null,
    mapDispatchToProps
)(GenerationQueueContainer);
