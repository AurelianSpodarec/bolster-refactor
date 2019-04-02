import React, { Component } from 'react';
import { connect } from 'react-redux';
import SiteClientAccess from '../presentational/SiteClientAccess';

class SiteClientAccessContainer extends Component {
    render() {
        return <SiteClientAccess />;
    }
}

export default connect(
    null,
    null
)(SiteClientAccessContainer);
