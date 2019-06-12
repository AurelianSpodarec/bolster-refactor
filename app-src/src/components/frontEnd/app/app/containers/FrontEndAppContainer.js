import React, { Component } from 'react';
import { connect } from 'react-redux';

import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import FrontEndApp from '../presentational/FrontEndApp';

class FrontEndAppContainer extends Component {
    render() {
        return <FrontEndApp />;
    }

    componentDidMount() {
        const { decodeJWT } = this.props;
        decodeJWT();
    }
}

const mapDispatchToProps = dispatch => ({
    decodeJWT: () => {
        dispatch(decodeJWT());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(FrontEndAppContainer);
