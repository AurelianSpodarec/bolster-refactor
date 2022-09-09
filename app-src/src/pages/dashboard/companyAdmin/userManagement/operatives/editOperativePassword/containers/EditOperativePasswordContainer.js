import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import EditOperativePassword from '../presentational/EditOperativePassword';

class EditOperativePasswordContainer extends Component {
    render = () => <EditOperativePassword operativeName="##User Name##" />;
}

// const mapDispatchToProps = dispatch => ({
//    fetchSingleUser
// });

export default withRouter(connect(null)(EditOperativePasswordContainer));
