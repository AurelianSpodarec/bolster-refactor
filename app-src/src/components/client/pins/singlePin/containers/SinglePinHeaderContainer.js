import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SingleDrawingHeader from '../presentational/SinglePinHeader';

class SinglePinHeaderContainer extends Component {
    render() {
        const { pin, location } = this.props;

        return <SingleDrawingHeader pin={pin} location={location} />;
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
