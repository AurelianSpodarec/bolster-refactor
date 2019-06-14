import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SinglePinHeader from '../presentational/SinglePinHeader';

class SinglePinHeaderContainer extends Component {
    render() {
        const { pin, location } = this.props;

        return <SinglePinHeader pin={pin} location={location} />;
    }
}

export default withRouter(
    connect(
        (
            {
                companyAdmin: {
                    pinsReducer: { pins }
                }
            },
            { match: { params } }
        ) => ({
            pin: pins[params.id] || {}
        })
    )(SinglePinHeaderContainer)
);
