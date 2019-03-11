import React, { Component } from 'react';
import { connect } from 'react-redux';

import SinglePin from '../presentational/SinglePin';

class SinglePinContainer extends Component {
    render() {
        return <SinglePin />;
    }
}

const mapDispatchToProps = () => ({});

export default connect(
    null,
    mapDispatchToProps
)(SinglePinContainer);
