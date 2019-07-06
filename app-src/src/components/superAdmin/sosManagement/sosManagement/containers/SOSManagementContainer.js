import React, { Component } from 'react';
import { connect } from 'react-redux';

import SOSManagement from '../presentational/SOSManagement';
import fetchAllSOSCodes from 'actions/superAdmin/sosManagement/async/fetchAllSOSCodes';

class SOSManagementContainer extends Component {
    render() {
        return <SOSManagement />;
    }
    componentDidMount() {
        this.props.fetchAllSOSCodes();
    }
}

const mapDispatchToProps = {
    fetchAllSOSCodes
};

export default connect(
    null,
    mapDispatchToProps
)(SOSManagementContainer);
